

# Zillow CampusNest: Cracking Boston's Student Housing Code

This project simplifies the housing search process in Boston by optimizing recommendations based on user preferences like proximity to landmarks, budget, and living preferences. Through data analysis and visualization tools, we developed a user-friendly dashboard to enhance property search and decision-making.

---

# Problem Statement

Finding affordable and suitable housing in Boston is challenging due to fragmented search methods and lack of data-driven insights.

**Challenges**:
- Optimizing property availability with demand surges.
- Enhancing user experience in housing searches.

---

# Objectives

- Analyze demand patterns to recommend housing efficiently.
- Develop a dashboard to help users search properties by:
  - **Proximity** to landmarks.
  - **Budget** and affordability.
  - **Living preferences** (e.g., shared/private, number of bedrooms/bathrooms).
- Predict property prices accurately for better decision-making.

---

# Data Pipeline

1. **Data Collection**:
   - Scraped Zillow data (18k+ records, 22-31 columns).
2. **Preprocessing**:
   - Cleaning missing and inconsistent data.
   - Mapping zip codes to neighborhoods.
   - Calculating proximity to landmarks.
   - Generating additional features like price per bedroom.
3. **Visualization**:
   - Tableau dashboards for storytelling and user interaction.
4. **Prediction**:
   - Developed ML models for price prediction with high accuracy.

---

# Key Features

- **Interactive Dashboard**:
  - Search by proximity to landmarks like Northeastern University.
  - View properties filtered by price, bedrooms, and bathrooms.
  - Analyze transit accessibility and Zestimate values.
- **Predictive Analytics**:
  - Accurate property value predictions for informed decisions.
- **Insights**:
  - Highlighted neighborhoods with optimal proximity and affordability.
  - Identified areas with the highest average scores and Zestimate-price gaps.

---

# Results

- **Visual Highlights**:
  - Seaport District has the highest average accessibility score (67).
  - Fenway/Kenmore offers the lowest proximity to Northeastern University (1.4 miles).
- **Predictive Model**:
  - Achieved high accuracy in property price predictions, benefiting buyers, sellers, and investors.

---

# Tools & Technologies

- **Data Cleaning & Transformation**: Python (pandas, NumPy)
- **Visualization**: Tableau
- **Modeling**: Scikit-learn, XGBoost
- **Data Storage**: JSON to CSV conversion
- **Additional Calculations**: Correlation analysis, distance mapping

---

# How to Use

1. Clone the repository.
2. Install dependencies (`requirements.txt`).
3. Run the Python scripts for data preprocessing and model training.
4. Explore insights via the Tableau dashboard.

---

# Authors

**Shreyashri Athani**  
**Sudarshan Paranjape**

Feel free to reach out for any queries or collaboration opportunities!
=======
# PropertyNest: Cracking Boston’s Housing Code
Overview
PropertyNest is a data-driven housing search optimization project aimed at helping users find suitable and affordable accommodations in Boston. Using Zillow rental data, we analyze housing trends, optimize property recommendations, and provide an interactive dashboard for streamlined searches based on location, budget, and living preferences.

# Problem Statement
Finding affordable housing near key landmarks is challenging due to:
Fragmented and inefficient search methods.
Lack of centralized insights on pricing, availability, and legitimacy.
Difficulty in aligning available listings with user preferences.

# Objective
The goal is to optimize housing recommendations by:

Analyzing demand patterns and pricing trends.
Developing an interactive dashboard for efficient searches.
Ensuring affordability, proximity to key locations, and suitability based on user preferences.
Data Collection & Preprocessing
The dataset comprises ~18,000+ Zillow listings with attributes covering price, location, property type, and availability.

Steps Involved:
Data Collection & Integration
Scraped Zillow data and converted JSON to CSV format.
Merged multiple datasets for comprehensive analysis.

# Data Cleaning & Transformation
Handled missing values (e.g., area, bedrooms, bathrooms).
Removed redundant and inconsistent data.
Mapped ZIP codes to neighborhoods in Boston, Cambridge, and Brookline.
Created a “Score” metric based on location proximity and listing attributes.

# Exploratory Data Analysis (EDA)

Correlation analysis between street name, address, and pricing.
Distance calculations from key landmarks.
Identified key pricing trends across different neighborhoods.

# User Story
Meet Jacob, a student at Northeastern University looking for housing:

Where should I stay? → Neighborhood & proximity analysis.
Is the rent fair? → Zestimate price validation.
Can I stay with friends? → Bedrooms & bathrooms analysis.
Are listings legit? → Zillow-owned & showcase listing validation.

# Results & Insights
Key findings using Tableau dashboards:
Seaport District had the highest average housing score.
Brighton had the lowest median rent (~$1100).
Fenway/Kenmore, Roxbury, Chinatown & South Boston were within a 2-mile radius from NEU.
Predictive model developed to replace Zestimate for rent estimation.
>>>>>>> 656d9c0 (Added code and data files)
