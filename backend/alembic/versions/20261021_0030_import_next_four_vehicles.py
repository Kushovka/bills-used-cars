"""Import the next four vehicles from the supplied inventory archive.

Revision ID: 20261021_0030
Revises: 20261021_0029
Create Date: 2026-10-21
"""

from datetime import datetime
from uuid import uuid4

from alembic import op
import sqlalchemy as sa


revision = "20261021_0030"
down_revision = "20261021_0029"
branch_labels = None
depends_on = None


VEHICLES = [
    {
        "slug": "2022-ram-1500-trx-ignition-edition",
        "title": "2022 Ram 1500 TRX Crew Cab 4x4 Ignition Edition",
        "make": "Ram",
        "model": "1500",
        "trim": "TRX Crew Cab 4x4 Ignition Edition",
        "year": 2022,
        "stock_number": "BUC18365",
        "mileage": 1400,
        "body_type": "Truck",
        "transmission": "8-Speed Automatic",
        "drivetrain": "Four-Wheel Drive (4WD)",
        "engine": "6.2L Supercharged HEMI V8",
        "exterior_color": "Ignition Orange Clear-Coat",
        "interior_color": "Black Leather and Microsuede with Orange Accents",
        "description": (
            "The supercharged 6.2L HEMI V8 produces 702 hp and 650 lb-ft, paired with an 8-speed "
            "automatic, full-time two-speed transfer case, and electronic-locking rear differential. "
            "Finished in Ignition Orange over a black leather and microsuede cabin with orange accents, "
            "this TRX Ignition Edition has adaptive Bilstein shocks, black 18-inch wheels, TRX graphics, "
            "a RamBar, and a dual-pane panoramic sunroof. Equipment includes heated and ventilated front "
            "and rear seats, a head-up display, adaptive cruise control, trailer steering assistance, "
            "and a 19-speaker Harman Kardon system with 12-inch Uconnect navigation."
        ),
        "features": [
            "6.2L Supercharged HEMI V8",
            "702 hp and 650 lb-ft of Torque",
            "8-Speed Automatic Transmission",
            "Full-Time Two-Speed Transfer Case",
            "Electronic-Locking Rear Differential with 3.55:1 Gearing",
            "Four-Wheel Drive",
            "1,400 Miles",
            "Ignition Orange Clear-Coat Paint",
            "Black TRX Ignition Edition Graphics",
            "Black Leather and Microsuede Upholstery with Orange Accents",
            "Black 18-inch Aluminum Wheels",
            "325/65 Goodyear Wrangler Territory AT Tires",
            "Adaptive Bilstein BlackHawk e2 Shocks with Remote Reservoirs",
            "TRX Level 2 Equipment Group",
            "Dual-Pane Panoramic Sunroof",
            "Mopar Off-Road Running Boards and RamBar",
            "Spray-In Bedliner and Bed-Mounted Spare",
            "Heated and Ventilated Front and Rear Seats",
            "Heated Steering Wheel and Power-Adjustable Pedals",
            "Head-Up Display and Adaptive Cruise Control with Stop and Go",
            "Lane Keep Assist and Pedestrian Emergency Braking",
            "Trailer Reverse Steering Control and Trailer Brake Controller",
            "Uconnect Navigation with 12-inch Touchscreen",
            "Apple CarPlay and Android Auto",
            "19-Speaker Harman Kardon Sound System",
            "Carfax Report Lists an Open Recall",
        ],
        "specs": {"power": "702 hp", "torque": "650 lb-ft"},
        "images_total": 351,
    },
    {
        "slug": "2023-ford-f150-raptor-r",
        "title": "2023 Ford F-150 Raptor R SuperCrew",
        "make": "Ford",
        "model": "F-150",
        "trim": "Raptor R SuperCrew",
        "year": 2023,
        "stock_number": "BUC70842",
        "mileage": 3100,
        "body_type": "Truck",
        "transmission": "10-Speed Automatic",
        "drivetrain": "Four-Wheel Drive (4WD)",
        "engine": "5.2L Supercharged Predator V8",
        "exterior_color": "Code Orange Metallic",
        "interior_color": "Black Nirvana Leather and Microsuede",
        "description": (
            "The 5.2L supercharged Predator V8 is rated at 700 hp and 640 lb-ft and is paired with a "
            "10-speed automatic, dual-range transfer case, and electronic-locking rear differential. "
            "Finished in Code Orange Metallic over black Nirvana leather and microsuede, this Raptor R "
            "features 17-inch forged-aluminum wheels, 37-inch BFGoodrich all-terrain tires, Fox Live Valve "
            "shocks, and a dual-panel sunroof. The cabin adds heated and ventilated Recaro front seats, "
            "heated rear seats, a surround-view camera system, SYNC 4 navigation, and Bang & Olufsen audio."
        ),
        "features": [
            "5.2L Supercharged Predator V8",
            "700 hp and 640 lb-ft of Torque",
            "10-Speed Automatic Transmission",
            "Dual-Range Transfer Case",
            "Electronic-Locking Rear Differential",
            "Four-Wheel Drive",
            "3,100 Miles",
            "Code Orange Metallic Paint and Raptor R Graphics",
            "Black Nirvana Leather and Microsuede Upholstery",
            "17-inch Forged-Aluminum Beadlock-Capable Wheels",
            "37x12.5-inch BFGoodrich All-Terrain T/A KO2 Tires",
            "Fox Live Valve Shocks, Terrain Management System, and Trail Control",
            "Dual-Panel Sunroof and Power Tailgate with Stowable Step",
            "Heated and Ventilated Recaro Front Seats",
            "Heated 60/40 Split-Folding Rear Bench",
            "SYNC 4 with 12-inch Touchscreen and Navigation",
            "Apple CarPlay and Android Auto",
            "Surround-View Camera System",
            "Lane-Keeping System and Blind-Spot Information System",
            "Bang & Olufsen Sound System",
            "Carfax Report Notes an Open Manufacturer Customer-Satisfaction Program",
        ],
        "specs": {"power": "700 hp", "torque": "640 lb-ft"},
        "images_total": 194,
    },
    {
        "slug": "2023-ram-1500-trx",
        "title": "2023 Ram 1500 TRX Crew Cab 4x4",
        "make": "Ram",
        "model": "1500",
        "trim": "TRX Crew Cab 4x4",
        "year": 2023,
        "stock_number": "BUC59271",
        "mileage": 18000,
        "body_type": "Truck",
        "transmission": "8-Speed Automatic",
        "drivetrain": "Four-Wheel Drive (4WD)",
        "engine": "6.2L Supercharged HEMI V8",
        "exterior_color": "Granite Crystal Metallic and Diamond Black Crystal",
        "interior_color": "Black and Red Leather and Microsuede",
        "description": (
            "The supercharged 6.2L HEMI V8 produces 702 hp and 650 lb-ft, routed through an 8-speed "
            "automatic and full-time two-speed transfer case to an electronic-locking rear differential. "
            "Finished in Granite Crystal and Diamond Black over a black and red leather and microsuede "
            "interior, this TRX is equipped with Bilstein adaptive dampers, black 18-inch wheels, a RamBar, "
            "and a RetraxPRO MX tonneau cover. TRX Level 2 and Carbon Fiber packages add heated and "
            "ventilated seats, adaptive cruise control, a 360-degree camera, a head-up display, and a "
            "19-speaker Harman Kardon system."
        ),
        "features": [
            "6.2L Supercharged HEMI V8",
            "702 hp and 650 lb-ft of Torque",
            "8-Speed Automatic Transmission",
            "Full-Time Two-Speed Transfer Case",
            "Electronic-Locking Rear Differential with 3.55:1 Gearing",
            "Four-Wheel Drive",
            "18,000 Miles",
            "Granite Crystal Metallic and Diamond Black Crystal Paint",
            "Black and Red Leather and Microsuede Upholstery",
            "TRX Level 2 and TRX Carbon Fiber Packages",
            "Bed Utility, Trailer-Tow, and Advanced Safety Groups",
            "Black 18-inch Aluminum Wheels with 325/65 Goodyear Wrangler Territory AT Tires",
            "Bilstein BlackHawk e2 Adaptive Dampers with Remote Reservoirs",
            "RamBar and RetraxPRO MX Tonneau Cover",
            "AMP Research BedXtender and PowerSteps",
            "Heated and Ventilated Front and Rear Seats",
            "Power-Adjustable Pedals and Head-Up Display",
            "Adaptive Cruise Control and 360-Degree Surround-View Camera",
            "BlackVue Front-Facing Camera and Wireless Charging",
            "12-inch Uconnect Navigation with Apple CarPlay and Android Auto",
            "19-Speaker Harman Kardon Sound System",
            "CatStrap Catalytic Converter Protection System",
            "Oil and Engine and Cabin Air Filters Changed in June 2026",
            "Steering Wheel and Turn-Signal Switch Replaced in April 2024",
            "Carfax Report Lists an Open Recall",
        ],
        "specs": {"power": "702 hp", "torque": "650 lb-ft"},
        "images_total": 125,
    },
    {
        "slug": "2024-ford-bronco-raptor",
        "title": "2024 Ford Bronco Raptor 4x4",
        "make": "Ford",
        "model": "Bronco",
        "trim": "Raptor 4x4",
        "year": 2024,
        "stock_number": "BUC34609",
        "mileage": 297,
        "body_type": "SUV",
        "transmission": "10-Speed Automatic",
        "drivetrain": "Four-Wheel Drive (4WD)",
        "engine": "3.0L Twin-Turbocharged EcoBoost V6",
        "exterior_color": "Oxford White",
        "interior_color": "Black Onyx Leather and Suede",
        "description": (
            "The twin-turbocharged 3.0L EcoBoost V6 produces 418 hp and 440 lb-ft, paired with a "
            "10-speed automatic and dual-range transfer case. Finished in Oxford White over Black Onyx "
            "leather and suede, this Bronco Raptor features black 17-inch forged-aluminum wheels, "
            "Raptor-specific bodywork, removable doors, and side steps. Dana locking front and rear axles, "
            "seven G.O.A.T. drive modes, and a 360-degree camera support trail use, while the cabin adds "
            "heated front seats, a heated steering wheel, SYNC 4 navigation, and keyless entry."
        ),
        "features": [
            "3.0L Twin-Turbocharged EcoBoost V6",
            "418 hp and 440 lb-ft of Torque",
            "10-Speed Automatic Transmission",
            "Dual-Range Transfer Case",
            "Dana Locking Front and Rear Axles",
            "Four-Wheel Drive",
            "297 Miles",
            "Oxford White Paint",
            "Black Onyx Leather and Suede Upholstery",
            "Black-Finished 17-inch Forged-Aluminum Wheels",
            "BFGoodrich Tires with Matching Spare",
            "Raptor-Specific Fender Flares, Vented Hood, and Removable Doors",
            "Terrain Management System with Seven G.O.A.T. Drive Modes",
            "Side Steps and Exposed Tow Hooks",
            "Heated Front Seats and Heated Steering Wheel",
            "Dual-Zone Automatic Climate Control",
            "360-Degree Camera System and Parking Sensors",
            "SYNC 4 with Navigation",
            "Lane-Keeping System and Blind-Spot Alert",
            "Keyless Entry",
            "Carfax Report Shows No Accidents or Other Reported Damage and Lists an Open Recall",
        ],
        "specs": {"power": "418 hp", "torque": "440 lb-ft"},
        "images_total": 114,
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


def upgrade() -> None:
    table = _vehicle_table()
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
