"""Import the next four vehicles and remove accident-history features.

Revision ID: 20261021_0031
Revises: 20261021_0030
Create Date: 2026-10-21
"""

from datetime import datetime
from uuid import uuid4
import re

from alembic import op
import sqlalchemy as sa


revision = "20261021_0031"
down_revision = "20261021_0030"
branch_labels = None
depends_on = None


VEHICLES = [
    {
        "slug": "2021-ford-bronco-wildtrak-2-door",
        "title": "2021 Ford Bronco Wildtrak 2-Door",
        "make": "Ford",
        "model": "Bronco",
        "trim": "Wildtrak 2-Door",
        "year": 2021,
        "stock_number": "BUC47261",
        "mileage": 31000,
        "body_type": "SUV",
        "transmission": "10-Speed Automatic",
        "drivetrain": "Four-Wheel Drive (4WD)",
        "engine": "2.7L Twin-Turbocharged EcoBoost V6",
        "exterior_color": "Cyber Orange Metallic Tri-Coat",
        "interior_color": "Black Onyx and Medium Sandstone Leather",
        "description": (
            "The twin-turbocharged 2.7L EcoBoost V6 is rated at 330 hp and 415 lb-ft and is paired "
            "with a 10-speed automatic, dual-range transfer case, and electronic-locking front and rear "
            "differentials. Finished in Cyber Orange over Black Onyx and Medium Sandstone leather, this "
            "two-door Wildtrak has a Zone Offroad lift, Bronco Raptor-style 17-inch wheels, 37-inch "
            "BFGoodrich tires, removable hardtop panels, and 4WP running boards. Inside are heated seats, "
            "SYNC 4 navigation, a 360-degree camera, and a Rockford Fosgate amplifier with a 12-inch subwoofer."
        ),
        "features": [
            "2.7L Twin-Turbocharged EcoBoost V6",
            "330 hp and 415 lb-ft of Torque",
            "10-Speed Automatic Transmission",
            "Dual-Range Transfer Case",
            "Electronic-Locking Front and Rear Differentials with 4.70:1 Gearing",
            "Four-Wheel Drive",
            "31,000 Miles",
            "Cyber Orange Metallic Tri-Coat Paint with Wildtrak Graphics",
            "Black Onyx and Medium Sandstone Leather Upholstery",
            "Bronco Raptor-Style 17-inch Wheels with 37-inch BFGoodrich All-Terrain Tires",
            "Zone Offroad 3-inch Front and 2-inch Rear Lift with Bilstein Shocks",
            "Sasquatch, High, and Mid Packages",
            "Removable Hardtop Panels and 4WP Running Boards",
            "Rigid Wheelwell and Grille-Mounted LED Lighting",
            "K&N Air Filter and JKS Steering-Sleeve Kit",
            "Heated Front Seats and Dual-Zone Automatic Climate Control",
            "SYNC 4 Navigation with 12-inch Touchscreen",
            "360-Degree Camera and Forward-Sensing System",
            "Ford Co-Pilot360 with Blind-Spot and Cross-Traffic Alerts",
            "Rockford Fosgate Amplifier and 12-inch Subwoofer",
            "iOttie Qi Wireless Charger and Auxiliary Switches",
            "Rock Chip on Hood Noted",
            "Open Manufacturer Recall Listed",
        ],
        "specs": {"power": "330 hp", "torque": "415 lb-ft"},
        "images_total": 75,
    },
    {
        "slug": "2021-jeep-wrangler-unlimited-rubicon-392",
        "title": "2021 Jeep Wrangler Unlimited Rubicon 392",
        "make": "Jeep",
        "model": "Wrangler Unlimited",
        "trim": "Rubicon 392",
        "year": 2021,
        "stock_number": "BUC93847",
        "mileage": 38000,
        "body_type": "SUV",
        "transmission": "8-Speed Automatic",
        "drivetrain": "Four-Wheel Drive (4WD)",
        "engine": "6.4L HEMI V8",
        "exterior_color": "Sting-Gray",
        "interior_color": "Black Leather",
        "description": (
            "The 6.4L HEMI V8 produces 470 hp and 470 lb-ft, paired with an 8-speed automatic, "
            "Rock-Trac dual-range transfer case, and Tru-Lok locking front and rear differentials. "
            "Finished in Sting-Gray over black leather, this Rubicon 392 rides on bronze beadlock-capable "
            "17-inch wheels with Falken Wildpeak tires and features a performance suspension, a front "
            "sway-bar disconnect, and a Sky One-Touch power-retractable roof. Heated power front seats, "
            "adaptive cruise control, an Alpine sound system, and Uconnect navigation with an integrated "
            "off-road camera round out the equipment; a set of half doors is also included."
        ),
        "features": [
            "6.4L HEMI V8",
            "470 hp and 470 lb-ft of Torque",
            "8-Speed Automatic Transmission",
            "Rock-Trac Dual-Range Transfer Case",
            "Tru-Lok Locking Front and Rear Differentials",
            "Four-Wheel Drive",
            "38,000 Miles",
            "Sting-Gray Paint",
            "Black Leather Upholstery",
            "Bronze 17-inch Beadlock-Capable Y-Spoke Wheels",
            "285/70 Falken Wildpeak M/T01 Tires",
            "Performance Suspension and Front Sway-Bar Disconnect",
            "Sky One-Touch Power-Retractable Roof",
            "Corning Gorilla Glass Windshield",
            "Full Doors and Additional Half Doors",
            "Heated Power-Adjustable Front Seats",
            "Adaptive Cruise Control and Automatic Climate Control",
            "Alpine Premium Sound System",
            "Uconnect 4C with 8.4-inch Display and Navigation",
            "Integrated Off-Road Camera and ParkView Rear Camera",
            "Apple CarPlay and Android Auto",
            "Trail Rail Cargo Management System",
            "Oil Changed",
        ],
        "specs": {"power": "470 hp", "torque": "470 lb-ft"},
        "images_total": 113,
    },
    {
        "slug": "2022-lexus-gx460-black-line",
        "title": "2022 Lexus GX 460 Black Line Special Edition",
        "make": "Lexus",
        "model": "GX 460",
        "trim": "Black Line Special Edition",
        "year": 2022,
        "stock_number": "BUC56820",
        "mileage": 19000,
        "body_type": "SUV",
        "transmission": "6-Speed Automatic",
        "drivetrain": "Four-Wheel Drive (4WD)",
        "engine": "4.6L V8",
        "exterior_color": "Nori Green Pearl",
        "interior_color": "Black NuLuxe with Gray Inserts",
        "description": (
            "The 4.6L V8 is rated at 301 hp and 329 lb-ft and is paired with a 6-speed automatic, "
            "dual-range transfer case, and Torsen limited-slip center differential with electronic lock. "
            "Finished in Nori Green Pearl over Black NuLuxe with gray inserts, this GX Black Line rides "
            "on black 18-inch split-spoke wheels and features the Kinetic Dynamic Suspension System, "
            "sunroof, roof rails, and running boards. The three-row cabin includes heated and ventilated "
            "front seats, heated second-row seats, navigation, Dynamic Radar Cruise Control, and a "
            "10.3-inch touchscreen."
        ),
        "features": [
            "4.6L V8",
            "301 hp and 329 lb-ft of Torque",
            "6-Speed Automatic Transmission",
            "Dual-Range Transfer Case",
            "Torsen Limited-Slip Center Differential with Electronic Lock",
            "Four-Wheel Drive",
            "19,000 Miles",
            "Nori Green Pearl Paint with Black Exterior Trim",
            "Black NuLuxe Upholstery with Gray Inserts and Stitching",
            "Black 18-inch Split-Spoke Alloy Wheels",
            "Kinetic Dynamic Suspension System",
            "Sunroof, Black Roof Rails, Running Boards, and Roof Spoiler",
            "Heated and Ventilated Power-Adjustable Front Seats",
            "Heated Second-Row Seats and Folding Third-Row Seats",
            "Dynamic Radar Cruise Control",
            "10.3-inch Touchscreen with Navigation",
            "Rearview Camera and Parking Sensors",
            "Blind Spot Monitor with Rear Cross-Traffic Alert",
            "Dual-Zone Automatic Climate Control",
            "Nine-Speaker Audio System and CD Player",
            "Owner's Manual Included",
        ],
        "specs": {"power": "301 hp", "torque": "329 lb-ft"},
        "images_total": 115,
    },
    {
        "slug": "2025-ford-bronco-outer-banks-4-door",
        "title": "2025 Ford Bronco Outer Banks 4-Door",
        "make": "Ford",
        "model": "Bronco",
        "trim": "Outer Banks 4-Door",
        "year": 2025,
        "stock_number": "BUC73145",
        "mileage": 4600,
        "body_type": "SUV",
        "transmission": "10-Speed Automatic",
        "drivetrain": "Four-Wheel Drive (4WD)",
        "engine": "2.7L Twin-Turbocharged EcoBoost V6",
        "exterior_color": "Azure Gray Metallic Tri-Coat",
        "interior_color": "Black Leather and Vinyl",
        "description": (
            "The twin-turbocharged 2.7L EcoBoost V6 produces 330 hp and 415 lb-ft and is paired with "
            "a 10-speed automatic and dual-range transfer case. Finished in Azure Gray Metallic over "
            "black leather and vinyl, this four-door Outer Banks has a retractable soft top, removable "
            "doors, 18-inch machined aluminum wheels, and Equipment Group 314A. The Lux Package adds "
            "heated front seats, remote start, Ford Co-Pilot360, and a 12-speaker Bang & Olufsen system; "
            "other highlights include seven G.O.A.T. drive modes, SYNC 4 navigation, a 360-degree camera, "
            "and adaptive cruise control."
        ),
        "features": [
            "2.7L Twin-Turbocharged EcoBoost V6",
            "330 hp and 415 lb-ft of Torque",
            "10-Speed Automatic Transmission",
            "Dual-Range Transfer Case",
            "Dana Front and Rear Axles",
            "Four-Wheel Drive",
            "4,600 Miles",
            "Azure Gray Metallic Tri-Coat Paint",
            "Black Leather and Vinyl Upholstery",
            "18-inch Machined Aluminum Wheels with 255/70 Bridgestone Dueler A/T Tires",
            "Equipment Group 314A with Lux Package",
            "Retractable Black Soft Top and Removable Doors",
            "Terrain Management System with Seven G.O.A.T. Drive Modes",
            "Running Boards, Receiver Hitch, and Splash Guards",
            "Heated Front Seats and Dual-Zone Automatic Climate Control",
            "Remote Start, Keyless Entry, and Push-Button Ignition",
            "SYNC 4 with Navigation",
            "12-Speaker Bang & Olufsen Sound System",
            "360-Degree Camera and Adaptive Cruise Control",
            "Blind-Spot Monitoring and Cross-Traffic Alert",
            "Heated Steering Wheel and 12-inch Digital Instrument Cluster",
            "Open Manufacturer Recall Listed",
        ],
        "specs": {"power": "330 hp", "torque": "415 lb-ft"},
        "images_total": 150,
    },
]


def _vehicle_table():
    return sa.table(
        "vehicles",
        sa.column("id", sa.String),
        sa.column("slug", sa.String),
        sa.column("title", sa.String),
        sa.column("make", sa.String),
        sa.column("model", sa.String),
        sa.column("trim", sa.String),
        sa.column("year", sa.Integer),
        sa.column("status", sa.String),
        sa.column("stock_number", sa.String),
        sa.column("vin", sa.String),
        sa.column("price", sa.Integer),
        sa.column("mileage", sa.Integer),
        sa.column("body_type", sa.String),
        sa.column("transmission", sa.String),
        sa.column("drivetrain", sa.String),
        sa.column("engine", sa.String),
        sa.column("exterior_color", sa.String),
        sa.column("interior_color", sa.String),
        sa.column("location", sa.String),
        sa.column("short_description", sa.String),
        sa.column("description", sa.Text),
        sa.column("images", sa.JSON),
        sa.column("features", sa.JSON),
        sa.column("specs", sa.JSON),
        sa.column("details", sa.JSON),
        sa.column("featured", sa.Boolean),
        sa.column("financing_available", sa.Boolean),
        sa.column("warranty_available", sa.Boolean),
        sa.column("delivery_available", sa.Boolean),
        sa.column("created_at", sa.DateTime),
    )


def _remove_accident_history_features(table) -> None:
    bind = op.get_bind()
    rows = bind.execute(sa.select(table.c.id, table.c.features)).all()
    accident_history = re.compile(r"\b(accident|damage)\b|vehicle history report", re.I)
    source_report = re.compile(r"carfax", re.I)
    recall = re.compile(r"\brecall\b", re.I)
    customer_program = re.compile(r"customer.satisfaction", re.I)
    for row in rows:
        features = row.features or []
        kept = []
        for feature in features:
            if source_report.search(feature):
                if recall.search(feature):
                    kept.append("Open Manufacturer Recall Listed")
                elif customer_program.search(feature):
                    kept.append("Open Manufacturer Customer-Satisfaction Program Listed")
                continue
            if accident_history.search(feature):
                continue
            kept.append(feature)
        if kept != features:
            bind.execute(
                table.update().where(table.c.id == row.id).values(features=kept)
            )


def upgrade() -> None:
    table = _vehicle_table()
    _remove_accident_history_features(table)
    rows = []
    for vehicle in VEHICLES:
        slug = vehicle["slug"]
        rows.append({
            "id": str(uuid4()),
            "slug": slug,
            "title": vehicle["title"],
            "make": vehicle["make"],
            "model": vehicle["model"],
            "trim": vehicle["trim"],
            "year": vehicle["year"],
            "status": "Available",
            "stock_number": vehicle["stock_number"],
            "vin": None,
            "price": 0,
            "mileage": vehicle["mileage"],
            "body_type": vehicle["body_type"],
            "transmission": vehicle["transmission"],
            "drivetrain": vehicle["drivetrain"],
            "engine": vehicle["engine"],
            "exterior_color": vehicle["exterior_color"],
            "interior_color": vehicle["interior_color"],
            "location": "Baldwinville, MA",
            "short_description": vehicle["description"],
            "description": vehicle["description"],
            "images": [
                f"/media/vehicles/{slug}/{image_number:03d}.webp"
                for image_number in range(1, vehicle["images_total"] + 1)
            ],
            "features": vehicle["features"],
            "specs": vehicle["specs"],
            "details": {},
            "featured": False,
            "financing_available": False,
            "warranty_available": True,
            "delivery_available": True,
            "created_at": datetime.utcnow(),
        })
    op.bulk_insert(table, rows)


def downgrade() -> None:
    table = _vehicle_table()
    op.get_bind().execute(
        table.delete().where(table.c.slug.in_([vehicle["slug"] for vehicle in VEHICLES]))
    )
