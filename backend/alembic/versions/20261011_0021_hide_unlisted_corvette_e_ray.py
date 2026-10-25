"""Hide the Corvette E-Ray that is not present in the inventory sheet.

Revision ID: 20261011_0021
Revises: 20261010_0020
Create Date: 2026-10-11
"""

from alembic import op
import sqlalchemy as sa


revision = "20261011_0021"
down_revision = "20261010_0020"
branch_labels = None
depends_on = None


UNLISTED_VEHICLE_SLUG = "2025-chevrolet-corvette-e-ray-convertible-3lz"


def upgrade() -> None:
    connection = op.get_bind()
    connection.execute(
        sa.text(
            "UPDATE vehicles "
            "SET status = :status, featured = false "
            "WHERE slug = :slug"
        ),
        {"status": "Hidden", "slug": UNLISTED_VEHICLE_SLUG},
    )


def downgrade() -> None:
    connection = op.get_bind()
    connection.execute(
        sa.text(
            "UPDATE vehicles "
            "SET status = :status "
            "WHERE slug = :slug AND status = :hidden_status"
        ),
        {
            "status": "Available",
            "slug": UNLISTED_VEHICLE_SLUG,
            "hidden_status": "Hidden",
        },
    )
