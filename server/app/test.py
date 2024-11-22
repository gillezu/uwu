import random
from enum import Enum
from typing import List, Tuple
import math


class CellState(Enum):
    ALIVE = 1
    DEAD = 0


class Cell:
    def __init__(self, x: int, y: int, state: CellState = CellState.DEAD, freezed: bool = False) -> None:
        self.x = x
        self.y = y
        self.state = state
        self.next_state = state  # Stores the next state after applying rules
        self.time_not_changed = 0
        self.freezed = freezed

    def determine_next_state(self, neighbors: List['Cell']):
        """Determine the cell's next state based on Game of Life rules."""
        alive_neighbors = sum(1 for neighbor in neighbors if neighbor.state == CellState.ALIVE)

        if self.state == CellState.ALIVE:
            self.next_state = CellState.ALIVE if alive_neighbors in [2, 3] else CellState.DEAD
        else:
            self.next_state = CellState.ALIVE if alive_neighbors == 3 else CellState.DEAD

        '''Count for time, that a cell did not change'''
        if self.state == self.next_state:
            self.time_not_changed += 1
        else:
            self.time_not_changed = 0
    
    def update_state(self):
        """Update cell's state to its next state."""
        self.state = self.next_state


class Grid:
    def __init__(self, width: int, height: int, cell_size: int) -> None:
        self.width = width
        self.height = height
        self.cell_size = cell_size
        self.cells = [[Cell(x, y) for y in range(height)] for x in range(width)]
        self.stats = [0, 0, 0, 0]  # Alive, Dead, New Alive, New Dead

    def to_dict(self):
        self.get_stats()
        return {
            "width": self.width,
            "height": self.height,
            "cells": [[cell.state.value for cell in row] for row in self.cells],
            "stats": self.stats,
            "cell_size": self.cell_size,
            "cell_age": [[cell.time_not_changed for cell in row] for row in self.cells],
            "freezed": [[cell.freezed for cell in row] for row in self.cells]
        }

    def apply_rle_pattern(self, rle: str):
        """Wendet ein RLE-Pattern auf das Grid an."""
        rle_grid = Grid.parse_rle(rle, width=None, height=None)

        # Größe des RLE-Musters bestimmen
        pattern_width = len(rle_grid[0])
        pattern_height = len(rle_grid)
        print(pattern_width, pattern_height)

        # Berechnung der Offsets für die Zentrierung
        offset_x = (self.width - pattern_width) // 2
        offset_y = (self.height - pattern_height) // 2
        
        # Zustände auf das Grid anwenden
        for x, row in enumerate(rle_grid):
            for y, value in enumerate(row):
                if 0 <= x + offset_x < self.width and 0 <= y + offset_y < self.height:
                    self.cells[x + offset_x][y + offset_y].state = (
                        CellState.ALIVE if value == 1 else CellState.DEAD
                    )
                    self.cells[x + offset_x][y + offset_y].time_not_changed = 0

    @staticmethod
    def parse_rle(rle, width=None, height=None):
        """Parst ein RLE-Pattern in ein 2D-Grid."""
        lines = rle.splitlines()
        header = [line for line in lines if line.startswith('#')]
        pattern = [line for line in lines if not line.startswith('#')]
        pattern = ''.join(pattern).replace('\n', '')

        # RLE dekodieren
        rows = []
        current_row = []
        count = ''
        for char in pattern:
            if char.isdigit():
                count += char  # Baue Ziffern zusammen
            elif char in 'bo':
                current_row.extend([1 if char == 'o' else 0] * (int(count) if count else 1))
                count = ''
            elif char == '$':
                rows.append(current_row)
                current_row = []
        rows.append(current_row)  # Letzte Zeile hinzufügen

        # Normalisieren: Sicherstellen, dass alle Zeilen gleich lang sind
        max_length = max(len(row) for row in rows)
        grid = [row + [0] * (max_length - len(row)) for row in rows]

        # Optional: Größe anpassen
        if width or height:
            target_width = width if width else len(grid[0])
            target_height = height if height else len(grid)
            padded_grid = [[0] * target_width for _ in range(target_height)]

            for i in range(min(target_height, len(grid))):
                for j in range(min(target_width, len(grid[i]))):
                    padded_grid[i][j] = grid[i][j]
            grid = padded_grid

        return grid

    def initialize_random(self):
        """Randomly initialize the grid with alive and dead cells."""
        for row in self.cells:
            for cell in row:
                cell.state = (
                    CellState.ALIVE if random.random() > 0.7 else CellState.DEAD
                )
                cell.time_not_changed = 0

    def change_cell_state(self, x, y):
        cell = self.cells[x][y]
        if cell.state == CellState.ALIVE:
            cell.state = CellState.DEAD
        else:
            cell.state = CellState.ALIVE

    def reset_field(self):
        for row in self.cells:
            for cell in row:
                cell.next_state = CellState.DEAD
                cell.time_not_changed = 0
                cell.update_state()

    def get_neighbors(self, cell: Cell) -> List[Cell]:
        """Return a list of neighboring cells for a given cell."""
        neighbors = []
        for dx, dy in [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]:
            nx, ny = cell.x + dx, cell.y + dy
            if 0 <= nx < self.width and 0 <= ny < self.height:
                neighbors.append(self.cells[nx][ny])
        return neighbors
    
    def update(self):
        """Apply Game of Life rules to each cell in the grid."""
        # Determine next state for each cell
        for row in self.cells:
            for cell in row:
                neighbors = self.get_neighbors(cell)
                cell.determine_next_state(neighbors)
        for row in self.cells:
            for cell in row:
                if not cell.freezed:
                    cell.update_state()

    def apply_spell(self, key: int, pos_x: int = None, pos_y: int = None):
        if key == 0:
            self.apply_lightning(pos_x, pos_y)
        elif key == 1:
            self.apply_earthquake()
        elif key == 2:
            self.apply_freeze(pos_x, pos_y)
        elif key == 3:
            self.apply_unfreeze()

    def apply_lightning(self, pos_x: int, pos_y: int):
        for i, row in enumerate(self.cells):
            if math.sqrt(pow(i - pos_x, 2)) <= 10:
                for j, cell in enumerate(row):
                    if math.sqrt(pow(i - pos_x, 2) + pow(j - pos_y, 2)) <= 10:
                        cell.next_state = CellState.ALIVE if cell.state == CellState.DEAD else CellState.DEAD
                        cell.time_not_changed = 0
                        cell.update_state()
    
    def apply_freeze(self, pos_x: int, pos_y: int):
        for i, row in enumerate(self.cells):
            if math.sqrt(pow(i - pos_x, 2)) <= 10:
                for j, cell in enumerate(row):
                    if math.sqrt(pow(i - pos_x, 2) + pow(j - pos_y, 2)) <= 10:
                        cell.freezed = True

    def apply_unfreeze(self):
        for i, row in enumerate(self.cells):
            for j, cell in enumerate(row):
                cell.freezed = False
    
    def apply_earthquake(self):
        for row in self.cells:
            for cell in row:
                cell.next_state = CellState.ALIVE if cell.state == CellState.DEAD else CellState.DEAD
                cell.time_not_changed = 0
                cell.update_state()
    
    def get_stats(self):
        self.stats = [0, 0, 0, 0]
        for row in self.cells:
            for cell in row:
                if cell.state == CellState.ALIVE:
                    self.stats[0] += 1
                    if cell.time_not_changed == 0:
                        self.stats[2] += 1
                else:
                    self.stats[1] += 1
                    if cell.time_not_changed == 0:
                        self.stats[3] += 1

