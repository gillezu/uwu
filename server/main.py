"""import pygame

pygame.init()

WIDTH = 400
HEIGHT = 600

screen = pygame.display.set_mode((WIDTH, HEIGHT))

run = True
while run:

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            run = False

pygame.quit()
"""

# import pygame_gui
import random
from enum import Enum
from typing import List, Tuple

import pygame

pygame.init()
myfont = pygame.font.SysFont("monospace", 20)


# Enum for cell states
class CellState(Enum):
    ALIVE = 1
    DEAD = 0


# Class for each cell in the grid
class Cell:
    def __init__(self, x: int, y: int, state: CellState = CellState.DEAD):
        self.x = x
        self.y = y
        self.state = state
        self.next_state = state  # Stores the next state after applying rules
        self.time_not_changed = 0

    def determine_next_state(self, neighbors: List["Cell"]):
        """Determine the cell's next state based on Game of Life rules."""
        alive_neighbors = sum(
            1 for neighbor in neighbors if neighbor.state == CellState.ALIVE
        )

        if self.state == CellState.ALIVE:
            self.next_state = (
                CellState.ALIVE if alive_neighbors in [2, 3] else CellState.DEAD
            )
        else:
            self.next_state = (
                CellState.ALIVE if alive_neighbors == 3 else CellState.DEAD
            )

        """Count for time, that a cell did not change"""
        if self.state == self.next_state:
            self.time_not_changed += 1
        else:
            self.time_not_changed = 0

    def update_state(self):
        """Update cell's state to its next state."""
        self.state = self.next_state


# Class for the grid of cells
class Grid:
    def __init__(self, width: int, height: int, cell_size: int):
        self.width = width
        self.height = height
        self.cell_size = cell_size
        self.cells = [[Cell(x, y) for y in range(height)] for x in range(width)]
        self.stats = [0, 0, 0, 0]  # Alive, Dead, New Alive, New Dead

    def initialize_random(self):
        """Randomly initialize the grid with alive and dead cells."""
        for row in self.cells:
            for cell in row:
                cell.state = (
                    CellState.ALIVE if random.random() > 0.7 else CellState.DEAD
                )

    # FIX: reset background when resettig field
    def reset_field(self, screen):
        """Reset reset_field"""
        screen.fill((255, 255, 255))
        for row in self.cells:
            for cell in row:
                cell.state = CellState.DEAD
                cell.time_not_changed = 0

    def initialize_manually(self):
        for row in self.cells:
            for cell in row:
                cell.state = CellState.DEAD

    def get_neighbors(self, cell: Cell) -> List[Cell]:
        """Return a list of neighboring cells for a given cell."""
        neighbors = []
        for dx, dy in [
            (-1, -1),
            (-1, 0),
            (-1, 1),
            (0, -1),
            (0, 1),
            (1, -1),
            (1, 0),
            (1, 1),
        ]:
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

        # Update state to the next state
        for row in self.cells:
            for cell in row:
                cell.update_state()

    def draw(self, screen):
        """Draw the grid of cells to the screen."""
        self.stats = [0, 0, 0, 0]
        for row in self.cells:
            for cell in row:
                # 1 color
                # color = (0, 255, 0) if cell.state == CellState.ALIVE else (0, 0, 0)
                # changing colors and calculating stats
                if cell.state == CellState.ALIVE:
                    color = (
                        max(255 - 2 * cell.time_not_changed, 0),
                        min(cell.time_not_changed, 255),
                        max(255 - 0.5 * cell.time_not_changed, 0),
                    )
                    self.stats[0] += 1
                    if cell.time_not_changed == 0:
                        self.stats[2] += 1
                else:
                    color = (
                        max(255 - cell.time_not_changed, 0),
                        max(255 - cell.time_not_changed, 0),
                        max(255 - cell.time_not_changed, 0),
                    )
                    self.stats[1] += 1
                    if cell.time_not_changed == 0:
                        self.stats[3] += 1
                pygame.draw.rect(
                    screen,
                    color,
                    pygame.Rect(
                        cell.x * self.cell_size,
                        cell.y * self.cell_size,
                        self.cell_size,
                        self.cell_size,
                    ),
                )


# Main Game of Life class to control the game flow
class GameOfLife:
    def __init__(self, width: int, height: int, cell_size: int):
        self.width = width
        self.height = height
        self.cell_size = cell_size
        self.grid = Grid(width, height, cell_size)
        self.generation = 0

    def initialize(self):
        """Initialize the grid with a random setup of alive and dead cells."""
        # self.grid.initialize_random()
        self.grid.initialize_manually()

    def initialize_automatically(self):
        """Initialize the grid with a random setup of alive and dead cells."""
        self.grid.initialize_random()

    def reset_field(self, screen):
        self.grid.reset_field(screen)

    def next_generation(self):
        """Advance the grid to the next generation."""
        self.grid.update()


# Buttons
red_button = pygame.Surface((50, 50))
red_button.fill((255, 0, 0))

blue_button = pygame.Surface((50, 50))
blue_button.fill((0, 0, 255))

green_button = pygame.Surface((50, 50))
green_button.fill((0, 255, 0))

stat_button = pygame.Surface((50, 50))
stat_button.fill((50, 50, 50))

stat_surface = pygame.Surface((400, 200))
stat_surface.fill((100, 100, 100))


# Pygame setup and main loop
def main():
    cell_size = 12
    grid_width, grid_height = 100, 100  # Defines the grid size in terms of cells
    red_button_offset = (grid_width * cell_size / 2 - 50, grid_height * cell_size + 10)
    label_offset = (grid_width * cell_size - 200, grid_height * cell_size + 10)
    stat_label_1_offset = (70, 50)
    stat_label_2_offset = (70, 80)
    # stat_label_3_offset = (70, 110)
    # stat_label_4_offset = (70, 140)
    blue_button_offset = (grid_width * cell_size / 2, grid_height * cell_size + 10)
    green_button_offset = (
        grid_width * cell_size / 2 + 50,
        grid_height * cell_size + 10,
    )
    screen = pygame.display.set_mode(
        (grid_width * cell_size, grid_height * cell_size + 100)
    )
    pygame.display.set_caption("Conway's Game of Life")
    # manager = pygame_gui.UIManager((800, 600))
    clock = pygame.time.Clock()

    # Initialize game
    game = GameOfLife(grid_width, grid_height, cell_size)
    game.initialize()

    running = True
    started = False
    stats_opened = False
    count = 0
    while running:
        screen.fill((0, 0, 0))

        # Event handling
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

            pos = pygame.mouse.get_pos()
            if event.type == pygame.MOUSEBUTTONDOWN:
                if red_button.get_rect(topleft=red_button_offset).collidepoint(pos):
                    started = not started
                if (
                    not started
                    and 0 <= pos[0] <= (grid_width * cell_size)
                    and 0 <= pos[1] <= (grid_height * cell_size)
                ):
                    pos_cell = [pos[0] // cell_size, pos[1] // cell_size]
                    cell = game.grid.cells[pos_cell[0]][pos_cell[1]]
                    if cell.state == CellState.ALIVE:
                        cell.state = CellState.DEAD
                    else:
                        cell.state = CellState.ALIVE
                if not started and blue_button.get_rect(
                    topleft=blue_button_offset
                ).collidepoint(pos):
                    game.initialize_automatically()
                    count = 0

                if not started and green_button.get_rect(
                    topleft=green_button_offset
                ).collidepoint(pos):
                    game.reset_field(screen)
                    count = 0

        # Update and draw
        if started:
            game.next_generation()
            count += 1

        game.grid.draw(screen)

        stat_label_1 = myfont.render(
            f"Cells alive: {game.grid.stats[0]}", 1, (255, 255, 0)
        )
        stat_label_2 = myfont.render(
            f"Cells dead: {game.grid.stats[1]}", 1, (255, 255, 0)
        )
        # stat_label_3 = myfont.render(f'Newborns: {game.grid.stats[2]}', 1, (255,255,0))
        # stat_label_4 = myfont.render(f'Deaths: {game.grid.stats[3]}', 1, (255,255,0))

        if (stat_button.get_rect().collidepoint(pos) and stats_opened == False) or (
            stat_surface.get_rect().collidepoint(pos) and stats_opened == True
        ):
            stats_opened = True
            screen.blit(stat_surface, (0, 0))
            screen.blit(stat_label_1, stat_label_1_offset)
            screen.blit(stat_label_2, stat_label_2_offset)
            # screen.blit(stat_label_3, stat_label_3_offset)
            # screen.blit(stat_label_4, stat_label_4_offset)
        else:
            stats_opened = False

        screen.blit(red_button, red_button_offset)
        screen.blit(blue_button, blue_button_offset)
        screen.blit(green_button, green_button_offset)
        screen.blit(stat_button, (0, 0))
        label = myfont.render(f"Count: {count}", 1, (255, 255, 0))
        screen.blit(label, label_offset)
        pygame.display.update()
        # pygame.display.flip()
        clock.tick(60)  # Control the speed of generations (10 frames per second)

    pygame.quit()


# Run the game
if __name__ == "__main__":
    main()
