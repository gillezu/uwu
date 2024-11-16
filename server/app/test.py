import random
from enum import Enum
from typing import List, Tuple
import math


class CellState(Enum):
    ALIVE = 1
    DEAD = 0


class Cell:
    def __init__(self, x: int, y: int, state: CellState = CellState.DEAD) -> None:
        self.x = x
        self.y = y
        self.state = state
        self.next_state = state  # Stores the next state after applying rules
        self.time_not_changed = 0

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
        return {
            "width": self.width,
            "height": self.height,
            "cells": [[cell.state.value for cell in row] for row in self.cells],
            "stats": self.stats,
            "cell_size": self.cell_size,
            "cell_age": [[cell.time_not_changed for cell in row] for row in self.cells]
        }

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
                cell.update_state()

