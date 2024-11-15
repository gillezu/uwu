import random
from enum import Enum


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
        if cell.state == CellState.ALIVE: cell.state = CellState.DEAD 
        else: cell.state = CellState.ALIVE