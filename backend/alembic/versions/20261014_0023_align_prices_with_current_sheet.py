"""Align active inventory prices with the current spreadsheet.

Revision ID: 20261014_0023
Revises: 20261011_0022
Create Date: 2026-10-14
"""

from alembic import op
import sqlalchemy as sa


revision = "20261014_0023"
down_revision = "20261011_0022"
branch_labels = None
depends_on = None


UPDATED_PRICES = {
    "2021-lexus-lx570-inspiration-series": 47499,
    "2025-mercedes-benz-gle63-s-amg-coupe": 74499,
    "2025-bmw-m4-competition-xdrive": 59999,
    "2025-bmw-m3-competition-xdrive": 59999,
    "2025-bmw-x5-xdrive40i-silver-anniversary": 42499,
    "2020-bmw-m760i-xdrive": 44999,
    "2024-bmw-m4-competition-xdrive-convertible": 54999,
    "2024-gmc-sierra-2500-at4": 49999,
    "2025-chevrolet-corvette-z06-convertible-2lz": 86999,
    "2022-gmc-sierra-1500-elevation": 29999,
    "2021-gmc-sierra-1500-denali": 26999,
    "2025-cadillac-ct5-v-blackwing": 78999,
    "2023-cadillac-ct5-v-blackwing-edition": 63999,
    "2022-cadillac-escalade-premium-luxury-4wd": 47999,
    "2023-cadillac-escalade-sport-platinum-onyx": 58999,
    "2024-cadillac-escalade-v": 89999,
    "2020-mercedes-benz-g63-amg-4matic": 90499,
    "2026-tesla-model-y-launch-edition": 34999,
    "2025-tesla-model-y-performance": 31499,
    "2024-tesla-cybertruck-cyberbeast-foundation": 64499,
    "2024-tesla-cybertruck-foundation-series": 57999,
}

PREVIOUS_PRICES = {
    "2021-lexus-lx570-inspiration-series": 49999,
    "2025-mercedes-benz-gle63-s-amg-coupe": 78499,
    "2025-bmw-m4-competition-xdrive": 63999,
    "2025-bmw-m3-competition-xdrive": 59999,
    "2025-bmw-x5-xdrive40i-silver-anniversary": 42999,
    "2020-bmw-m760i-xdrive": 40999,
    "2024-bmw-m4-competition-xdrive-convertible": 56999,
    "2024-gmc-sierra-2500-at4": 51999,
    "2025-chevrolet-corvette-z06-convertible-2lz": 86999,
    "2022-gmc-sierra-1500-elevation": 29999,
    "2021-gmc-sierra-1500-denali": 26999,
    "2025-cadillac-ct5-v-blackwing": 82999,
    "2023-cadillac-ct5-v-blackwing-edition": 63999,
    "2022-cadillac-escalade-premium-luxury-4wd": 47999,
    "2023-cadillac-escalade-sport-platinum-onyx": 64999,
    "2024-cadillac-escalade-v": 94999,
    "2020-mercedes-benz-g63-amg-4matic": 94999,
    "2026-tesla-model-y-launch-edition": 0,
    "2025-tesla-model-y-performance": 0,
    "2024-tesla-cybertruck-cyberbeast-foundation": 0,
    "2024-tesla-cybertruck-foundation-series": 0,
}


def _set_prices(prices: dict[str, int]) -> None:
    vehicles = sa.table(
        "vehicles",
        sa.column("slug", sa.String),
        sa.column("price", sa.Integer),
    )
    connection = op.get_bind()
    for slug, price in prices.items():
        connection.execute(
            vehicles.update().where(vehicles.c.slug == slug).values(price=price)
        )


def upgrade() -> None:
    _set_prices(UPDATED_PRICES)


def downgrade() -> None:
    _set_prices(PREVIOUS_PRICES)
