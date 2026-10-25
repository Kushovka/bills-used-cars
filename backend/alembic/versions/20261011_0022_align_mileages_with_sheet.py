"""Align listed vehicle mileages with the inventory sheet.

Revision ID: 20261011_0022
Revises: 20261011_0021
Create Date: 2026-10-11
"""

from alembic import op
import sqlalchemy as sa


revision = "20261011_0022"
down_revision = "20261011_0021"
branch_labels = None
depends_on = None


UPDATED_MILEAGES = {
    "2020-bmw-m760i-xdrive": 25000,
    "2025-chevrolet-corvette-z06-convertible-2lz": 2667,
    "2021-gmc-sierra-1500-denali": 21136,
    "2025-cadillac-ct5-v-blackwing": 6550,
    "2023-cadillac-ct5-v-blackwing-edition": 13811,
    "2023-cadillac-escalade-sport-platinum-onyx": 22767,
    "2020-mercedes-benz-g63-amg-4matic": 44884,
    "2026-tesla-model-y-launch-edition": 13812,
    "2025-tesla-model-y-performance": 13216,
    "2024-tesla-cybertruck-cyberbeast-foundation": 18320,
    "2024-tesla-cybertruck-foundation-series": 16447,
}

PREVIOUS_MILEAGES = {
    "2020-bmw-m760i-xdrive": 33002,
    "2025-chevrolet-corvette-z06-convertible-2lz": 5224,
    "2021-gmc-sierra-1500-denali": 18802,
    "2025-cadillac-ct5-v-blackwing": 4237,
    "2023-cadillac-ct5-v-blackwing-edition": 12000,
    "2023-cadillac-escalade-sport-platinum-onyx": 250,
    "2020-mercedes-benz-g63-amg-4matic": 20000,
    "2026-tesla-model-y-launch-edition": 17118,
    "2025-tesla-model-y-performance": 7200,
    "2024-tesla-cybertruck-cyberbeast-foundation": 600,
    "2024-tesla-cybertruck-foundation-series": 461,
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
