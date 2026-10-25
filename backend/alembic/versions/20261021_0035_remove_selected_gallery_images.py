"""Remove selected images from vehicle galleries.

Revision ID: 20261021_0035
Revises: 20261021_0034
Create Date: 2026-10-21
"""

from alembic import op
import sqlalchemy as sa


revision = "20261021_0035"
down_revision = "20261021_0034"
branch_labels = None
depends_on = None


REMOVED_IMAGES = {
    "2026-ford-f150-raptor-r": (121, 122, 178),
    "2024-ford-f150-raptor-supercrew": (163, 165),
    "2024-ford-bronco-raptor": (63, 64, 112),
    "2023-ram-1500-trx-diamond-black-7k": (40, 41, 127, 167, 168),
    "2023-ford-f150-raptor-r": (71,),
    "2021-jeep-wrangler-unlimited-rubicon-392": (79, 105, 108),
    "2021-ford-f150-raptor-supercrew": (72, 73, 81, 174),
    "2022-lexus-gx460-black-line": (65, 66, 77, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115),
    "2022-ram-1500-trx-ignition-edition": (211, 212, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351),
}


def _update_galleries(restore: bool = False) -> None:
    vehicles = sa.table(
        "vehicles",
        sa.column("slug", sa.String),
        sa.column("images", sa.JSON),
    )
    connection = op.get_bind()

    for slug, image_numbers in REMOVED_IMAGES.items():
        row = connection.execute(
            sa.select(vehicles.c.images).where(vehicles.c.slug == slug)
        ).first()
        if row is None:
            continue

        removed_paths = {
            f"/media/vehicles/{slug}/{image_number:03d}.webp"
            for image_number in image_numbers
        }
        images = list(row.images or [])
        if restore:
            images = sorted(set(images) | removed_paths)
        else:
            images = [path for path in images if path not in removed_paths]

        connection.execute(
            sa.update(vehicles)
            .where(vehicles.c.slug == slug)
            .values(images=images)
        )


def upgrade() -> None:
    _update_galleries()


def downgrade() -> None:
    _update_galleries(restore=True)
