# AI Resume Insights

AI Resume Insights is an AI-driven resume feedback system built with **Langchain** and the **Gemini API**, using a **Django backend** (with Django REST Framework) and a **Next.js/TypeScript frontend**. The system is designed to help job seekers enhance their resumes by evaluating them against over **30 key metrics**, generating actionable suggestions, and providing additional features like cover letter generation, job matching, and hard skills assessments.

# Screenshots



## Overview

AI Resume Insights leverages state-of-the-art AI and natural language processing techniques to provide detailed feedback on resumes. The core engine is built around Langchain, which orchestrates multiple agents—each evaluating a specific component of the resume. The system provides a **quantitative score (on a scale of 10)** for each evaluation metric along with detailed suggestions for improvement.



## Features

### Resume Evaluation

The resume is evaluated across **five key categories**, with each category further broken down into specific sub-metrics:

- **Impact**
  - Quantify Impact
  - Repetition
  - Weak Verbs
  - Responsibilities
  - Verb Tenses
  - Spelling & Consistency

- **Brevity**
  - Length & Depth
  - Use of Bullets
  - Bullet Lengths
  - Filler Words
  - Page Density

- **Style**
  - Buzzwords
  - Dates
  - Contact & Personal Details
  - Readability
  - Personal Pronouns
  - Active Voice
  - Consistency

- **Sections**
  - Overall Sections
  - Education
  - Unnecessary Sections
  - Skills

- **Soft Skills**
  - Communication
  - Leadership
  - Analytical
  - Teamwork
  - Drive

Each of these metrics is scored on a **scale of 10**. After analysis, the system provides:
- A score for each metric.
- An overall score for each category.
- An aggregated overall score for the resume.
- Tailored suggestions to help improve the content and formatting.

Additionally, the system stores historical resume evaluations, displays them in a table, and provides graphical visualizations of the best and worst scores over time. Users can download and view all their previous resumes along with the evaluation details.

### Cover Letter Generation

- **AI-generated Cover Letters:** Using Langchain agents, the system crafts a personalized cover letter based on the resume data.
- **Customization:** Users can adjust tone, style, and key details to better match their target job applications.

### Job Match Recommendations

- **Smart Matching:** The system analyzes resume content to provide job recommendations tailored to the user's skills and experience.
- **Real-time Insights:** Recommendations are based on current market trends and resume analytics.

### Hard Skills Assessment

- **MCQ Generation:** The system identifies all hard skills mentioned in the resume and generates multiple-choice questions (MCQs) to assess proficiency.
- **Quantitative Scoring:** Each hard skill is rated out of 10, helping users understand their strengths and areas for improvement.

### Recruiter Insights & FAQs

- **Recruiter FAQs:** Provides insights into what recruiters are looking for and common questions to expect during the hiring process.
- **Data-Driven Tips:** Offers actionable advice to optimize resumes for automated screening and recruiter review.

### User Profiles & Authentication

- **Google OAuth 2.0 Integration:** Secure authentication via Google.
- **Standard Auth Features:** Login, logout, and forgot password functionality.
- **Profile Management:** Users can update their name, avatar, and other personal details using PostgreSQL Database.
- **RESTful API:** Managed via Django REST Framework (DRF) for seamless integration with the frontend.

### Templates, Bullet Points, and Action Verbs

- **Resume Templates:** A variety of professional resume templates are suggested to help users design their resumes.
- **Bullet Point Suggestions:** Provides pre-formulated bullet points for common roles and responsibilities.
- **Action Verbs:** Recommends strong action verbs to enhance the impact of resume statements.


### UI

The frontend user interface of AI Resume Insights is designed to be both visually appealing and highly functional, ensuring a seamless user experience across all devices. To achieve this, we leveraged a combination of modern UI libraries and frameworks:

- **Tailwind CSS:** A utility-first CSS framework that accelerates styling and customization, enabling rapid and responsive design.
- **Material UI:** A comprehensive suite of React components that follow Google's Material Design guidelines, providing a consistent and modern look.
- **Headless UI:** Offers unstyled, fully accessible UI components that integrate smoothly with Tailwind CSS, allowing for complete design flexibility.
- **Radix UI:** A collection of low-level, accessible UI primitives that help build robust and interactive components.
- **Lucide React:**  A modern icon library that provides a clean and lightweight set of icons for an improved visual experience..

## Langchain Architecture

### How Langchain Works

**Langchain** is a framework designed for building applications with large language models. In this project, Langchain orchestrates the entire resume evaluation process through a network of agents:
- **Agents:** These are independent components that perform specific tasks, such as analyzing the impact or style of the resume.
- **Subagents:** For granular tasks (e.g., checking for weak verbs within the Impact category), subagents are employed to ensure detailed analysis.
- **Super-Agent:** The individual agent outputs are aggregated by a super-agent that compiles the overall resume score and feedback.
- **Orchestration:** Langchain manages the workflow by coordinating the execution of these agents in a defined sequence, ensuring that the analysis is both thorough and efficient.

The framework allows for modularity and scalability, meaning you can easily add new agents or modify existing ones to accommodate additional metrics or changes in evaluation strategy.

### Agent Breakdown and Workflow

1. **Primary Agents:** The system uses five primary agents corresponding to the key evaluation categories (Impact, Brevity, Style, Sections, and Soft Skills).
   
2. **Subagents:** 
   - Each primary agent comprises several subagents responsible for evaluating individual metrics. For example, the *Impact* agent contains subagents for "Quantify Impact", "Repetition", "Weak Verbs", etc.
   - These subagents analyze specific aspects of the resume and return a score (0-10) along with detailed suggestions.
   
3. **Super-Agent Coordination:** 
   - After individual agents complete their tasks, a super-agent collates all the scores and insights.
   - The super-agent calculates the overall scores for each evaluation category and the resume as a whole.
   - Langchain ensures that data flows smoothly between agents and that the final output is comprehensive and coherent.

4. **Additional Langchain Agents:** 
   - Separate Langchain agents handle **cover letter generation** and **job matching**.
   - These agents process resume data, generate context-aware content, and provide recommendations tailored to the user’s profile.



## Development Setup

### Backend Setup

The backend is built with Django and Django REST Framework, with PostgreSQL as the database. **Docker** is used for containerization, ensuring an isolated and reproducible environment.

- **Docker Containers:**
  - **Backend Container:** Runs the Django application.
  - **PostgreSQL Container:** Hosts the PostgreSQL database.
- **Dependency:** The backend container depends on the PostgreSQL container for database operations.


#### Environment Variables

Create a `.env.dev` file in the backend directory with the following content:

```env
DEBUG=1
SECRET_KEY=ai_resume_insights
DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]
SQL_ENGINE=django.db.backends.postgresql
SQL_DATABASE=airesumeinsights
SQL_USER=postgresuser
SQL_PASSWORD=postgrespassword
SQL_HOST=airesume_db
SQL_PORT=5432
DATABASE=postgres
GOOGLE_API_KEY=your_google_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/callback/google
```
Replace `your_google_api_key`, `your_google_client_id` and `your_google_client_secret` with your credentials.
Ensure these align with the settings in the Docker Compose YAML file.

### Running the Backend

Use Docker to build and run the backend:

```bash
sudo docker compose up --build
```

To stop the application:

```bash
sudo docker-compose down
```

## Frontend Setup

### Environment Variables

Create a `.env.local` file in the frontend directory with the following content:

```
NEXT_PUBLIC_API_HOST=http://localhost:8001
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Installing Dependencies

Run the following command in the frontend directory to install dependencies:

```bash
npm install
```

### Running the Frontend

Start the development server:

```bash
npm run dev
```

## Additional Notes

- Ensure that Docker and Node.js are installed on your system.
- The backend will be available at `http://localhost:8001` and the frontend at `http://localhost:3000` by default.
- Update environment variables as necessary for your deployment.

