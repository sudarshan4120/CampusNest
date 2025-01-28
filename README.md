---
title: "CampusNest: Cracking Boston's Housing Code"
author: "Shreyashri Athani & Sudarshan Paranjape"
date: "`r Sys.Date()`"
output: html_document
---

# Overview

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
