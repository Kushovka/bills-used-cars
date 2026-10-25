"""Synchronize imported vehicle feature labels with corrected mileages.

Revision ID: 20261021_0034
Revises: 20261021_0033
Create Date: 2026-10-21
"""

from alembic import op
import sqlalchemy as sa


revision = "20261021_0034"
down_revision = "20261021_0033"
branch_labels = None
depends_on = None


UPDATED_FEATURES = {
    "2021-jeep-wrangler-unlimited-rubicon-392": "29,286 Miles",
    "2024-ford-f150-raptor-supercrew": "29,211 Miles",
    "2023-ram-1500-trx-diamond-black-7k": "29,879 Miles",
    "2023-cadillac-escalade-sport-platinum": "30,236 Miles",
    "2024-ford-bronco-raptor": "10,975 Miles",
    "2021-ford-bronco-wildtrak-2-door": "34,750 Miles",
    "2023-ram-1500-trx": "42,618 Miles",
    "2023-ford-f150-raptor-r": "26,178 Miles",
    "2022-lexus-gx460-black-line": "30,798 Miles",
    "2021-ford-f150-raptor-supercrew": "28,322 Miles",
    "2026-ford-f150-raptor-r": "266 Miles",
    "2022-tesla-model-s-long-range": "46,421 Miles",
    "2021-tesla-model-s-long-range": "55,487 Miles",
    "2025-ford-bronco-outer-banks-4-door": "7,150 Miles",
    "2024-gmc-hummer-ev-suv-3x-omega-edition": "14,768 Miles",
}

PREVIOUS_FEATURES = {
    "2021-jeep-wrangler-unlimited-rubicon-392": "38,000 Miles",
    "2024-ford-f150-raptor-supercrew": "22,000 Miles",
    "2023-ram-1500-trx-diamond-black-7k": "7,000 Miles",
    "2023-cadillac-escalade-sport-platinum": "28,000 Miles",
    "2024-ford-bronco-raptor": "297 Miles",
    "2021-ford-bronco-wildtrak-2-door": "31,000 Miles",
    "2023-ram-1500-trx": "18,000 Miles",
    "2023-ford-f150-raptor-r": "3,100 Miles",
    "2022-lexus-gx460-black-line": "19,000 Miles",
    "2021-ford-f150-raptor-supercrew": "39,000 Miles",
    "2026-ford-f150-raptor-r": "3,800 Miles",
    "2022-tesla-model-s-long-range": "15,000 Miles",
    "2021-tesla-model-s-long-range": "29,000 Miles (rounded to 30,000 in the source)",
    "2025-ford-bronco-outer-banks-4-door": "4,600 Miles",
    "2024-gmc-hummer-ev-suv-3x-omega-edition": "1,200 Miles",
}


def _set_features(values: dict[str, str]) -> None:
    vehicles = sa.table(
        "vehicles",
        sa.column("slug", sa.String),
        sa.column("features", sa.JSON),
    )
    connection = op.get_bind()

    for slug, mileage_feature in values.items():
        row = connection.execute(
            sa.select(vehicles.c.features).where(vehicles.c.slug == slug)
        ).first()
        if row is None:
            continue

        features = list(row.features or [])
        for index, feature in enumerate(features):
            if "mile" in str(feature).lower():
                features[index] = mileage_feature
                break

        connection.execute(
            sa.update(vehicles)
            .where(vehicles.c.slug == slug)
            .values(features=features)
        )


def upgrade() -> None:
    _set_features(UPDATED_FEATURES)


def downgrade() -> None:
    _set_features(PREVIOUS_FEATURES)
