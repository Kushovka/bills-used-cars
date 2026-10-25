"""Import the next four vehicles from Cars2_4.

Revision ID: 20261021_0032
Revises: 20261021_0031
Create Date: 2026-10-21
"""

from datetime import datetime
from uuid import uuid4

from alembic import op
import sqlalchemy as sa


revision = "20261021_0032"
down_revision = "20261021_0031"
branch_labels = None
depends_on = None


VEHICLES = [
    {
        "slug": "2023-cadillac-escalade-sport-platinum",
        "title": "2023 Cadillac Escalade Sport Platinum 4WD",
        "make": "Cadillac",
        "model": "Escalade",
        "trim": "Sport Platinum 4WD",
        "year": 2023,
        "stock_number": "BUC18274",
        "mileage": 28000,
        "body_type": "SUV",
        "transmission": "10-Speed Automatic",
        "drivetrain": "Four-Wheel Drive (4WD)",
        "engine": "6.2L V8",
        "exterior_color": "Crystal White Tricoat",
        "interior_color": "Jet Black Leather",
        "description": (
            "The 6.2L V8 produces 420 hp and 460 lb-ft, paired with a 10-speed automatic and "
            "dual-range transfer case. Finished in Crystal White Tricoat over Jet Black leather, this "
            "Escalade Sport Platinum rides on 22-inch 14-spoke wheels and features Air Ride Adaptive "
            "Suspension and Magnetic Ride Control. The three-row cabin adds heated and ventilated "
            "front seats, heated second-row captain's chairs, a power-folding third row, rear-seat "
            "entertainment, Super Cruise, and a 36-speaker AKG Studio Reference audio system."
        ),
        "features": [
            "6.2L V8",
            "420 hp and 460 lb-ft of Torque",
            "10-Speed Automatic Transmission",
            "Dual-Range Transfer Case",
            "Four-Wheel Drive",
            "28,000 Miles",
            "Crystal White Tricoat Paint",
            "Jet Black Leather Upholstery",
            "22-inch 14-Spoke Alloy Wheels with 275/50 Bridgestone Alenza Tires",
            "Air Ride Adaptive Suspension",
            "Magnetic Ride Control",
            "Hands-Free Power Tailgate and Roof Rack",
            "Heated and Ventilated Power-Adjustable Front Seats",
            "Heated Second-Row Captain's Chairs",
            "Power-Folding Third-Row Seats",
            "Rear-Seat Entertainment System",
            "Curved OLED Displays with 38-inch Combined Screen Area",
            "14.2-inch Configurable OLED Instrument Cluster",
            "Super Cruise Driver Assistance",
            "Head-Up Display and Surround-View Camera System",
            "Adaptive Cruise Control and Parking Assistance",
            "36-Speaker AKG Studio Reference Audio System",
            "Multi-Zone Automatic Climate Control",
            "Oil Changed in October 2025",
        ],
        "specs": {"power": "420 hp", "torque": "460 lb-ft"},
        "images_total": 198,
    },
    {
        "slug": "2023-ram-1500-trx-diamond-black-7k",
        "title": "2023 Ram 1500 TRX Crew Cab 4x4",
        "make": "Ram",
        "model": "1500",
        "trim": "TRX Crew Cab 4x4",
        "year": 2023,
        "stock_number": "BUC64905",
        "mileage": 7000,
        "body_type": "Truck",
        "transmission": "8-Speed Automatic",
        "drivetrain": "Four-Wheel Drive (4WD)",
        "engine": "6.2L Supercharged HEMI V8",
        "exterior_color": "Diamond Black Crystal Pearl",
        "interior_color": "Black and Gray Leather and Microsuede",
        "description": (
            "The supercharged 6.2L HEMI V8 is rated at 702 hp and 650 lb-ft and sends power through "
            "an 8-speed automatic, full-time two-speed transfer case, and electronic-locking rear "
            "differential. Finished in Diamond Black Crystal Pearl over black and gray leather and "
            "microsuede, this TRX rides on 22-inch Vossen forged wheels with 35-inch Falken tires and "
            "has dual-valve Bilstein adaptive dampers. The Level 2, Trailer-Tow, and Advanced Safety "
            "packages add heated and ventilated seats, adaptive cruise control, a 360-degree camera, "
            "head-up display, and 19-speaker Harman Kardon audio; an additional set of 18-inch wheels "
            "is included."
        ),
        "features": [
            "6.2L Supercharged HEMI V8",
            "702 hp and 650 lb-ft of Torque",
            "8-Speed Automatic Transmission",
            "Full-Time Two-Speed Transfer Case",
            "Electronic-Locking Rear Differential with 3.55:1 Gearing",
            "Four-Wheel Drive",
            "7,000 Miles",
            "Diamond Black Crystal Pearl Paint",
            "Black and Gray Leather and Microsuede Upholstery",
            "TRX Level 2 Equipment Package",
            "Trailer-Tow and Advanced Safety Groups",
            "22-inch Vossen HF6-4 Forged Wheels with 35-inch Falken Wildpeak A/T4W Tires",
            "Dual-Valve Bilstein BlackHawk e2 Adaptive Dampers with Remote Reservoirs",
            "Additional 18-inch Beadlock-Capable Wheels with 325/65 Goodyear Territory MT Tires",
            "Heated and Ventilated Front and Rear Seats",
            "Power-Adjustable Pedals and Driver-Seat Memory",
            "Adaptive Cruise Control and 360-Degree Surround-View Camera",
            "Head-Up Display and Wireless Charging",
            "12-inch Uconnect Navigation with Apple CarPlay and Android Auto",
            "19-Speaker Harman Kardon Sound System",
            "Integrated Trailer Brake Controller and Trailer Reverse Steering Control",
            "Remote Start and Dual-Zone Automatic Climate Control",
        ],
        "specs": {"power": "702 hp", "torque": "650 lb-ft"},
        "images_total": 170,
    },
    {
        "slug": "2024-gmc-hummer-ev-suv-3x-omega-edition",
        "title": "2024 GMC Hummer EV SUV 3X Omega Edition",
        "make": "GMC",
        "model": "Hummer EV SUV",
        "trim": "3X Omega Edition",
        "year": 2024,
        "stock_number": "BUC30176",
        "mileage": 1200,
        "body_type": "SUV",
        "transmission": "Single-Speed Direct Drive",
        "drivetrain": "All-Wheel Drive (e4WD)",
        "engine": "Ultium Electric Drive System with Three Motors",
        "exterior_color": "Neptune Blue Matte",
        "interior_color": "Lunar Horizon Jet Black and Light Gray Leather",
        "description": (
            "The Ultium e4WD system combines a single-motor front drive unit with a locking differential "
            "and a dual-motor rear axle with virtual locking. Finished in Neptune Blue Matte over a Lunar "
            "Horizon cabin, this Hummer EV SUV 3X features the Extreme Off-Road Package, adaptive air "
            "suspension, CrabWalk four-wheel steering, and gloss-black beadlock wheels. Four removable "
            "glass roof panels, Watts to Freedom launch control, underbody cameras, Super Cruise, heated "
            "and ventilated front seats, and a Bose sound system round out its equipment."
        ),
        "features": [
            "Ultium Electric Drive System with Single-Motor Front Unit and Dual-Motor Rear Axle",
            "Electronic-Locking Front Differential and Virtual Rear Locking",
            "All-Wheel Drive (e4WD)",
            "1,200 Miles",
            "Ultium Battery System with 800V/350-kW Fast-Charging Compatibility",
            "Watts to Freedom Launch Control",
            "Neptune Blue Matte Paint",
            "Lunar Horizon Jet Black and Light Gray Leather Interior",
            "Extreme Off-Road Package with Locking Front and Rear Differentials",
            "Gloss-Black 18-inch Beadlock Wheels with Carbon Flash Trim Rings",
            "305/70 Goodyear Wrangler Territory MT Tires",
            "Adaptive Air Suspension and Regenerative Braking",
            "CrabWalk Four-Wheel Steering",
            "Infinity Roof with Four Removable Glass Sky Panels",
            "Power-Operated Tailgate and Front eTrunk with Under-Floor Storage",
            "Underbody Cameras, Skid Plates, and Rocker Protectors with Side Steps",
            "Heated and Ventilated Power-Adjustable Front Seats",
            "Heated Outboard Rear Seats and Tri-Zone Automatic Climate Control",
            "Super Cruise Driver Assistance and Surround-View Cameras",
            "13.4-inch Touchscreen with Navigation",
            "Apple CarPlay and Android Auto",
            "Wireless Phone Charging and Bose Sound System",
        ],
        "specs": {},
        "images_total": 178,
    },
    {
        "slug": "2026-ford-f150-raptor-r",
        "title": "2026 Ford F-150 Raptor R SuperCrew",
        "make": "Ford",
        "model": "F-150",
        "trim": "Raptor R SuperCrew",
        "year": 2026,
        "stock_number": "BUC93752",
        "mileage": 3800,
        "body_type": "Truck",
        "transmission": "10-Speed Automatic",
        "drivetrain": "Four-Wheel Drive (4WD)",
        "engine": "5.2L Supercharged Predator V8",
        "exterior_color": "Shelter Green",
        "interior_color": "Black Alcantara and Leather",
        "description": (
            "The supercharged 5.2L Predator V8 produces 720 hp and 640 lb-ft and is paired with a "
            "10-speed automatic, dual-range transfer case, and electronic-locking rear differential. "
            "Finished in Shelter Green over black Alcantara and leather, this Raptor R has 17-inch "
            "forged beadlock-capable wheels, Fox dual Live Valve shocks, and a dual-panel sunroof. "
            "Recaro front seats are heated and ventilated, with heated rear seats, a heated steering "
            "wheel, SYNC 4 navigation, surround-view cameras, and a 14-speaker Bang & Olufsen system."
        ),
        "features": [
            "5.2L Supercharged Predator V8",
            "720 hp and 640 lb-ft of Torque",
            "10-Speed Automatic Transmission",
            "Dual-Range Transfer Case",
            "Electronic-Locking Rear Differential",
            "Four-Wheel Drive",
            "3,800 Miles",
            "Shelter Green Paint",
            "Black Alcantara and Leather Upholstery with Raptor R Embroidery",
            "17-inch Forged-Aluminum Beadlock-Capable Wheels with BFGoodrich Tires",
            "Fox Racing Shox with Dual Live Valve Technology",
            "Terrain Management System and Trail Control",
            "Dual-Panel Sunroof and Power Tailgate",
            "Spray-In Bedliner and Cargo Bed Lighting",
            "Heated and Ventilated Recaro Front Seats",
            "Heated Rear Seats and Heated Steering Wheel",
            "SYNC 4 with 12-inch Touchscreen and Navigation",
            "Apple CarPlay and Android Auto",
            "14-Speaker Bang & Olufsen Sound System",
            "Surround-View Camera System",
            "Lane-Keeping System and Blind-Spot Information System",
            "Cross-Traffic Alert and Wireless Charging",
            "Carbon-Fiber Trim and Auxiliary Switch Bank",
        ],
        "specs": {"power": "720 hp", "torque": "640 lb-ft"},
        "images_total": 180,
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
