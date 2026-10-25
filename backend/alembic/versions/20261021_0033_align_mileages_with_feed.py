"""Align imported vehicle mileages with the Bring a Trailer feed.

Revision ID: 20261021_0033
Revises: 20261021_0032
Create Date: 2026-10-21
"""

from alembic import op
import sqlalchemy as sa


revision = "20261021_0033"
down_revision = "20261021_0032"
branch_labels = None
depends_on = None


UPDATED_MILEAGES = {
    "2021-jeep-wrangler-unlimited-rubicon-392": 29286,
    "2024-ford-f150-raptor-supercrew": 29211,
    "2023-ram-1500-trx-diamond-black-7k": 29879,
    "2023-cadillac-escalade-sport-platinum": 30236,
    "2024-ford-bronco-raptor": 10975,
    "2021-ford-bronco-wildtrak-2-door": 34750,
    "2023-ram-1500-trx": 42618,
    "2023-ford-f150-raptor-r": 26178,
    "2022-lexus-gx460-black-line": 30798,
    "2021-ford-f150-raptor-supercrew": 28322,
    "2026-ford-f150-raptor-r": 266,
    "2022-tesla-model-s-long-range": 46421,
    "2021-tesla-model-s-long-range": 55487,
    "2025-ford-bronco-outer-banks-4-door": 7150,
    "2024-gmc-hummer-ev-suv-3x-omega-edition": 14768,
}

PREVIOUS_MILEAGES = {
    "2021-jeep-wrangler-unlimited-rubicon-392": 38000,
    "2024-ford-f150-raptor-supercrew": 22000,
    "2023-ram-1500-trx-diamond-black-7k": 7000,
    "2023-cadillac-escalade-sport-platinum": 28000,
    "2024-ford-bronco-raptor": 297,
    "2021-ford-bronco-wildtrak-2-door": 31000,
    "2023-ram-1500-trx": 18000,
    "2023-ford-f150-raptor-r": 3100,
    "2022-lexus-gx460-black-line": 19000,
    "2021-ford-f150-raptor-supercrew": 39000,
    "2026-ford-f150-raptor-r": 3800,
    "2022-tesla-model-s-long-range": 15000,
    "2021-tesla-model-s-long-range": 29000,
    "2025-ford-bronco-outer-banks-4-door": 4600,
    "2024-gmc-hummer-ev-suv-3x-omega-edition": 1200,
}


def _set_mileages(values: dict[str, int]) -> None:
    vehicles = sa.table(
        "vehicles",
        sa.column("slug", sa.String),
        sa.column("mileage", sa.Integer),
        sa.column("details", sa.JSON),
    )
    connection = op.get_bind()

    for slug, mileage in values.items():
        row = connection.execute(
            sa.select(vehicles.c.details).where(vehicles.c.slug == slug)
        ).first()
        if row is None:
            continue

        details = dict(row.details or {})
        info = [dict(item) for item in details.get("info", [])]
        mileage_item = next(
            (item for item in info if str(item.get("label", "")).strip().lower() == "mileage"),
            None,
        )
        if mileage_item is None:
            info.insert(0, {"label": "Mileage", "value": f"{mileage:,} miles"})
        else:
            mileage_item["value"] = f"{mileage:,} miles"
        details["info"] = info

        connection.execute(
            sa.update(vehicles)
            .where(vehicles.c.slug == slug)
            .values(mileage=mileage, details=details)
        )


def upgrade() -> None:
    _set_mileages(UPDATED_MILEAGES)


def downgrade() -> None:
    _set_mileages(PREVIOUS_MILEAGES)
