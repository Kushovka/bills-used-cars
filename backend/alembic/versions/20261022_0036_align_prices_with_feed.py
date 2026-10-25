"""Align imported vehicle prices with the latest inventory price sheet.

Revision ID: 20261022_0036
Revises: 20261021_0035
Create Date: 2026-10-22
"""

from alembic import op
import sqlalchemy as sa


revision = "20261022_0036"
down_revision = "20261021_0035"
branch_labels = None
depends_on = None


UPDATED_PRICES = {
    "2021-jeep-wrangler-unlimited-rubicon-392": 42499,
    "2024-ford-f150-raptor-supercrew": 42499,
    "2022-ram-1500-trx-ignition-edition": 64999,
    "2023-ram-1500-trx-diamond-black-7k": 64999,
    "2023-cadillac-escalade-sport-platinum": 57499,
    "2024-ford-bronco-raptor": 56999,
    "2021-ford-bronco-wildtrak-2-door": 27499,
    "2023-ram-1500-trx": 59999,
    "2023-ford-f150-raptor-r": 79999,
    "2022-lexus-gx460-black-line": 37999,
    "2021-ford-f150-raptor-supercrew": 47499,
    "2026-ford-f150-raptor-r": 87499,
    "2022-tesla-model-s-long-range": 32499,
    "2021-tesla-model-s-long-range": 27499,
    "2025-ford-bronco-outer-banks-4-door": 36499,
    "2024-gmc-hummer-ev-suv-3x-omega-edition": 55999,
}

PREVIOUS_PRICES = {slug: 0 for slug in UPDATED_PRICES}


def _set_prices(prices: dict[str, int]) -> None:
    vehicles = sa.table(
        "vehicles",
        sa.column("slug", sa.String),
        sa.column("price", sa.Integer),
    )
    connection = op.get_bind()

    for slug, price in prices.items():
        result = connection.execute(
            sa.update(vehicles).where(vehicles.c.slug == slug).values(price=price)
        )
        if result.rowcount != 1:
            raise RuntimeError(
                f"Expected exactly one vehicle for {slug}, updated {result.rowcount}"
            )


def upgrade() -> None:
    _set_prices(UPDATED_PRICES)


def downgrade() -> None:
    _set_prices(PREVIOUS_PRICES)
