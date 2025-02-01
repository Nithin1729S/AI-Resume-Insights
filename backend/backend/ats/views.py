from django.shortcuts import render, redirect
import PyPDF2
from django.http import HttpResponse
from copy import deepcopy
from typing import Dict, TypedDict, Optional
from langgraph.graph import StateGraph, END
import random
import time
import json
import PyPDF2
import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
import time
import os
import json
import re
from typing import Dict, List, Union
from dotenv import load_dotenv
load_dotenv()

GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)
model=ChatGoogleGenerativeAI(model='gemini-pro',google_api_key=GOOGLE_API_KEY)



def llm(x):
    return model.invoke(x).content


class GraphState(TypedDict):
    subagent_feedback: Optional[list]=[]
    agent_feedback: Optional[list]=[]
    history: Optional[dict]={}
    resume: Optional[str]=None
    final_verdict: Optional[str]=None
    all_pairs: Optional[str]=None
    subagent: Optional[str]=None
    agent: Optional[str]=None



def handle_clean(state):
    "Function to clean the resume"
    resume= state.get('resume')
    print("Cleaning loaded text...")
    resume = llm(prompt_clean.format(resume))
    return {'resume':resume}



def handle_subagent(state):
    "Function to handle the subagents"
    time.sleep(5)
    history=state.get('history')
    subagent_feedback= state.get('subagent_feedback')
    resume=state.get('resume')
    all_pairs=state.get('all_pairs')
    
    agent = list(all_pairs.keys())[0]
    subagent=all_pairs[agent][0]
    
    current_feedback = llm(prompt_subagent.format(subagent,subagent_desc[agent][subagent],resume))
    subagent_feedback.extend(["{} : {}".format(subagent,current_feedback)])
    history[agent][subagent]=current_feedback
    all_pairs[agent].remove(subagent)
    return {'subagent_feedback':subagent_feedback,'history':history,'all_pairs':all_pairs,'agent':agent}



def handle_agent(state):
    "Function to handle the agents"
    time.sleep(5)
    feedback=state.get('subagent_feedback')
    agent_feedback=state.get('agent_feedback')
    all_pairs=state.get('all_pairs')
    history=state.get('history')
    
    agent=list(all_pairs.keys())[0]
    
    print("Reveiwing {} ... ".format(agent))
    
    summary = llm(prompt_agent.format(agent,agent_desc[agent],feedback))
    agent_feedback.extend(["{} : {}".format(agent,summary)])
    history[agent]['Overall']=summary
    
    del all_pairs[agent]
    
    try:
        agent=list(all_pairs.keys())[0]
    except:
        pass
    return {'agent_feedback':agent_feedback,'history':history,'all_pairs':all_pairs,'agent':agent}



def handle_superagent(state):
    "Function to handle the superagent"
    time.sleep(5)
    print("Final verdict getting updated...")
    history= state.get('history')
    feedback=state.get('agent_feedback')
    result=llm(prompt_superagent.format(feedback))
    history.update({"Final Verdict":result})
    return {'final_verdict':result,'history':history}
    


####################################################################################################################################################################################################
#Prompts

prompt_clean = "Clean the following resume by removing special characters and unnecessary text. Resume: {}"
# Descriptions for Subagents
subagent_desc = {
    "Impact": {
        "Quantify impact": "Use specific numbers, percentages, or metrics to clearly demonstrate the scale and significance of achievements.",
        "Repetition": "Maintain consistent language but avoid repeating phrases or descriptions across multiple sections.",
        "Weak verbs": "Use strong, action-oriented verbs to effectively highlight contributions and responsibilities.",
        "Verb tenses": "Ensure consistent use of present tense for current roles and past tense for previous roles.",
        "Responsibilities": "Highlight key tasks relevant to the job applied for, avoiding generic job descriptions.",
        "Spelling & consistency": "Ensure there are no spelling errors and formatting, capitalization, and punctuation remain consistent throughout."
    },
    
    "Brevity": {
        "Length": "Keep the resume concise—typically one page for entry-level positions or two for extensive experience.",
        "Bullet Lengths": "Ensure bullet points are concise (1-2 lines), focusing on key achievements and contributions.",
        "Filler Words": "Minimize filler words to maintain brevity and maximize the impact of each statement.",
        "Use of Bullets": "Ensure optimal use of bullet points",
        "Page Density":"Avoid dense paragraphs for better readability."
    },
    
    "Style": {
        "Buzzwords": "Incorporate relevant industry-specific keywords and terms that align with the job description.",
        "Dates": "Ensure employment dates follow a consistent format (e.g., MM/YYYY) and account for any unexplained gaps.",
        "Contact and Personal Details": "Clearly display name, contact information, and other essential personal details.",
        "Readability": "Use a simple, clean layout and font that is easy for ATS systems to parse. Avoid complex formatting or tables.",
        "Personal Pronouns": "Minimize the use of personal pronouns (e.g., 'I', 'me', 'my') to keep focus on achievements.",
        "Active Voice": "Use active voice to describe responsibilities and accomplishments, making the resume more impactful.",
        "Consistency": "Ensure formatting, language, and style are consistent throughout for a professional presentation."
    },
    
    "Sections": {
        "Summary": "Provide a concise overview of qualifications, experience, and career goals.",
        "Education": "Include academic background, such as degrees, institutions, and relevant coursework or achievements.",
        "Unnecessary Sections": "Omit irrelevant sections, such as hobbies or interests, unless they add specific value.",
        "Skills": "List technical, soft, and transferable skills relevant to the job to demonstrate your capabilities."
    },
    "SoftSkills": {
        "Analytical": "Evaluate the resume's demonstration of analytical problem-solving skills in various roles.",
        "Communication": "Assess the clarity and effectiveness of communication, including examples of presentations or reports.",
        "Drive": "Identify instances of motivation, initiative, and persistence in achieving goals.",
        "Leadership": "Evaluate evidence of leadership abilities, such as managing teams or leading projects.",
        "Teamwork": "Assess examples of collaboration, cooperation, and effective teamwork in the resume."
    }
}

# Descriptions for Agents
agent_desc = {
    "Impact": "Ensure the resume highlights achievements, contributions, and the value brought to employers.",
    "Brevity": "Keep the resume focused and easy to scan, ideally one page for entry-level and two pages for extensive experience.",
    "Style": "Ensure the layout, formatting, and visual appeal are clean, consistent, and professional.",
    "Sections": "Verify that key resume sections (Summary, Education, Work Experience, Skills) are included and relevant.",
    "SoftSkills": "Analyze the resume's demonstration of essential soft skills, including analytical thinking, communication, leadership, and teamwork."
}

# Prompt for Subagent
prompt_subagent = ("As a Resume Expert, you are tasked with analyzing this resume for {} in the area of {}. "
                   "Provide a score out of 10 and suggest improvements in 1-2 lines. Output both the score and feedback.")

# Prompt for Agent
prompt_agent = ("You are a Resume Expert analyzing the resume for {} regarding {}. Summarize the sub-agent feedback and "
                "provide a score out of 10, along with improvement suggestions in 1-2 lines. No bullet points or headings. "
                "Feedback report: {}")

# Prompt for Superagent
prompt_superagent = ("You are a Resume Expert tasked with giving a final score based on the feedback provided. "
                     "Rate the resume on a scale of 10 using the following analogy: "
                     "Score 3 or less: Trash, Score 5 or less: Needs major improvements, Score 6-7: Average, Score 8-9: Excellent, "
                     "Score 10: Exceptional. Provide the score and a brief paragraph with your reasoning. Feedback: {}")

#####################################################################################################################################################################################


agent_subagent_pairs={}
for main_key, nested_dict in subagent_desc.items():  
    pairs = {main_key: list(nested_dict.keys())}
    agent_subagent_pairs.update(pairs)

history=deepcopy(subagent_desc)

for key,value in history.items():
    if isinstance(value,dict):
        value['Overall']=""
        for nested_key,nested_value in value.items():
            value[nested_key]=""


workflow= StateGraph(GraphState)
workflow.add_node("handle_clean",handle_clean)
workflow.add_node("handle_subagent",handle_subagent)
workflow.add_node('handle_agent',handle_agent)
workflow.add_node('handle_superagent',handle_superagent)

def subagent_check(state):
    agent=state.get('agent')
    all_pairs=state.get('all_pairs')
    if len(all_pairs[agent]):
        return "handle_subagent"
    else:
        return "handle_agent"

def agent_check(state):
    all_pairs = state.get('all_pairs')
    if len(all_pairs.keys()):
        return "handle_subagent"
    else:  
        return "handle_superagent"

workflow.add_conditional_edges(
    "handle_subagent",
    subagent_check,
    {
        "handle_subagent":"handle_subagent",
        "handle_agent":"handle_agent"
    }
)

workflow.add_conditional_edges(
    "handle_agent",
    agent_check,
    {
        "handle_subagent":"handle_subagent",
        "handle_superagent":"handle_superagent"
    }
)

workflow.set_entry_point("handle_clean")
workflow.add_edge('handle_clean','handle_subagent')
workflow.add_edge('handle_superagent',END)

app = workflow.compile()


def save_conversation(conversation, filename='conversation.json'):
    with open(filename, 'w') as f:
        json.dump(conversation, f, indent=4)

def load_conversation(filename='conversation.json'):
    with open(filename, 'r') as f:
        conversation = json.load(f)
    return conversation

def extract_score(feedback: str) -> float:
    """
    Extract score from feedback text using multiple patterns.
    """
    # List of possible score patterns
    patterns = [
        r'scores?\s*(?:is|:)?\s*(\d+(?:\.\d+)?)\s*(?:/|\s*out\s*of\s*)10',  # matches "scores 6.7/10" or "score: 7/10"
        r'(?:with\s+)?(?:a\s+)?score(?:\s+of)?\s*(?::|is)?\s*(\d+(?:\.\d+)?)',  # matches "with a score of 7"
        r'(\d+(?:\.\d+)?)\s*(?:/|\s*out\s*of\s*)10',  # matches plain "7/10"
    ]
    
    # Try each pattern
    for pattern in patterns:
        match = re.search(pattern, feedback, re.IGNORECASE)
        if match:
            return float(match.group(1))
    
    return 0.0

def extract_feedback_text(feedback: str) -> str:
    # Remove score pattern from text
    clean_feedback = re.sub(r'\d+(?:\.\d+)?\s*/\s*10', '', feedback)
    # Remove any remaining numbers at the start
    clean_feedback = re.sub(r'^\s*\d+\s*[:,.]?\s*', '', clean_feedback)
    return clean_feedback.strip()

def structure_resume_analysis(conversation: Dict) -> Dict[str, Union[Dict, List, float]]:
    """
    Structures the resume analysis output into a clear dictionary format.
    
    Args:
        conversation: Raw conversation output from the LangChain workflow
        
    Returns:
        Dictionary containing structured analysis with scores and feedback
    """
    structured_output = {
        "subagent_analysis": {},
        "agent_summaries": {},
        "final_verdict": {
            "score": 0.0,
            "feedback": ""
        },
        "overall_scores": {
            "subagent_scores": {},
            "agent_scores": {},
            "final_score": 0.0
        }
    }
    
    # Process subagent feedback
    if "subagent_feedback" in conversation:
        for feedback in conversation["subagent_feedback"]:
            if ":" in feedback:
                subagent, content = feedback.split(":", 1)
                subagent = subagent.strip()
                content = content.strip()
                structured_output["subagent_analysis"][subagent] = {
                    "score": extract_score(content),
                    "feedback": extract_feedback_text(content)
                }
                structured_output["overall_scores"]["subagent_scores"][subagent] = extract_score(content)
    
    # Process agent feedback
    if "agent_feedback" in conversation:
        for feedback in conversation["agent_feedback"]:
            if ":" in feedback:
                agent, content = feedback.split(":", 1)
                agent = agent.strip()
                content = content.strip()
                
                structured_output["agent_summaries"][agent] = {
                    "score": extract_score(content),
                    "feedback": extract_feedback_text(content)
                }
                structured_output["overall_scores"]["agent_scores"][agent] = extract_score(content)
    
    # Process final verdict
    if "final_verdict" in conversation:
        verdict = conversation["final_verdict"]
        score_match = re.search(r'(\d+(?:\.\d+)?)\s*/\s*10', verdict)
        if score_match:
            structured_output["final_verdict"]["score"] = float(score_match.group(1))
            structured_output["overall_scores"]["final_score"] = float(score_match.group(1))
        structured_output["final_verdict"]["feedback"] = extract_feedback_text(verdict)
    
    # Process detailed history if available
    if "history" in conversation:
        structured_output["detailed_analysis"] = {}
        for category, subcategories in conversation["history"].items():
            if isinstance(subcategories, dict):
                structured_output["detailed_analysis"][category] = {
                    subcat: {
                        "score": extract_score(feedback),
                        "feedback": extract_feedback_text(feedback)
                    } if feedback else {}
                    for subcat, feedback in subcategories.items()
                }

    return structured_output

def resumeReview(resume):
    # Extract text from the uploaded PDF resume
    resume_file = resume
    lines = []
    
    # Open the PDF file using the provided path
    with open(resume, "rb") as resume_file:
        pdf_reader = PyPDF2.PdfReader(resume_file)
        num_pages = len(pdf_reader.pages)
        for page_num in range(num_pages):
            page = pdf_reader.pages[page_num]
            page_text = page.extract_text()
            lines.extend(page_text.split('\n'))

    lines = '\n'.join(lines)


    agent = list(agent_subagent_pairs.keys())[0]
    subagent = agent_subagent_pairs[agent][0] 
    # Uncomment to all api !!!!!!!!
    # conversation = app.invoke({
    #             'subagent_feedback': [],
    #             'agent_feedback': [],
    #             'history': history,
    #             'resume': lines,
    #             'all_pairs': deepcopy(agent_subagent_pairs),
    #             'agent': agent,
    #             'subagent': subagent
    #         }, {'recursion_limit': 100})

    # save_conversation(conversation)
    conversation=load_conversation()
    # After running your LangChain workflow
    structured_results = structure_resume_analysis(conversation)
    return structured_results

def extract_text_from_pdf(pdf_path):
    """Extract text content from a PDF file."""
    text = ""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                text += page.extract_text()
        return text
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return None
    

def extract_name(resume_text):
    """Extract name from resume using simple pattern matching."""
    lines = resume_text.split('\n')
    for line in lines[:5]:
        line = re.sub(r'[^\w\s]', '', line).strip()
        words = line.split()
        if 2 <= len(words) <= 3 and all(word.istitle() for word in words):
            return ' '.join(words)
    return "Candidate" 

def generate_cover_letter(resume,cache_file="cover_letter_cache.json"):
    """Generate a cover letter using Google's Gemini model."""
    model = genai.GenerativeModel('gemini-pro')
    resume_text = extract_text_from_pdf(resume)
    name = extract_name(resume_text)

    prompt = f"""Based on the following resume, write a professional cover letter. 
    Make it engaging and highlight the key skills and experiences mentioned in the resume.
    The candidate's name is: {name}

    Resume content:
    {resume_text}

    Write a formal cover letter that's genuine and showcases the candidate's relevant experience and enthusiasm.
    """

    try:
        #response = model.generate_content(prompt)
        print("Fuck")
        # Save the response to the cache file
        # with open(cache_file, "w") as file:
        #     json.dump({"response": response.text}, file)
        # print("Generated and cached response")

        # Immediately read and return the content from the cache file
        with open(cache_file, "r") as file:
            cached_data = json.load(file)
            return cached_data["response"]
        
    except Exception as e:
        return f"Error generating cover letter: {e}"
    
def generate_job_matches(resume,cache_file="job_matches_cache.json"):
    """Generate job matches using Google's Gemini model."""
    model = genai.GenerativeModel('gemini-pro')
    resume_text = extract_text_from_pdf(resume)

    prompt = f"""Based on the following resume, identify the top 5 most suitable job roles.
    For each role, provide a matching percentage (0-100) based on how well the candidate's 
    skills and experience align with typical requirements for that position.
    Format your response as:
    1. [Job Title] - [Match Percentage]%
    [Brief explanation of match based on specific resume elements]

    Resume content:
    {resume_text}

    Consider technical skills, experience level, industry background, and educational qualifications 
    when determining matches and percentages.
    """

    try:
        #response = model.generate_content(prompt)
        #print("Fuck")
        #Save the response to the cache file
        # with open(cache_file, "w") as file:
        #     json.dump({"response": response.text}, file)
        # print("Generated and cached response")

        # Immediately read and return the content from the cache file
        with open(cache_file, "r") as file:
            cached_data = json.load(file)
            return cached_data["response"]
        
    except Exception as e:
        return f"Error generating cover letter: {e}"


technical_skills = [
    # Programming Languages
    "Python", "Java", "JavaScript", "TypeScript", "C++", "C", "C#", "Go (Golang)", 
    "Ruby", "Swift", "Kotlin", "Rust", "PHP", "SQL", "Bash/Shell Scripting", 
    "R", "Scala", "Perl", "Dart", "Objective-C", "MATLAB", "Groovy", 
    "Elixir", "Erlang", "Haskell", "Lua", "Julia",

    # Web Development
    "HTML", "CSS", "React", "Angular", "Vue.js", "Node.js", "Django", 
    "Flask", "Spring Boot", "Express.js", "Ruby on Rails", "ASP.NET", 
    "jQuery", "Bootstrap", "Tailwind CSS", "SASS/SCSS", "Webpack", 
    "GraphQL", "REST APIs", "WebSockets", "JSON", "XML",

    # Databases
    "MySQL", "PostgreSQL", "MongoDB", "SQLite", "Oracle", "Redis", 
    "Cassandra", "Firebase", "DynamoDB", "Elasticsearch", "Neo4j", 
    "MariaDB", "Cosmos DB", "Snowflake", "BigQuery",

    # Cloud Technologies
    "AWS (Amazon Web Services)", "Google Cloud Platform (GCP)", 
    "Microsoft Azure", "Docker", "Kubernetes", "Terraform", 
    "Serverless Framework", "OpenStack", "Heroku", "CloudFormation", 
    "Ansible", "Jenkins", "GitLab CI/CD", "CircleCI", "Travis CI",

    # DevOps & Tools
    "Git", "GitHub", "GitLab", "Bitbucket", "Jira", "Confluence", 
    "Trello", "Slack", "Datadog", "Prometheus", "Grafana", 
    "Splunk", "Kibana", "Nagios", "New Relic", "Puppet", "Chef",

    # Mobile Development
    "Android Development", "iOS Development", "React Native", 
    "Flutter", "Xamarin", "SwiftUI", "Kotlin Multiplatform",

    # Data Science & Machine Learning
    "Pandas", "NumPy", "SciPy", "Matplotlib", "Seaborn", "Scikit-learn", 
    "TensorFlow", "PyTorch", "Keras", "OpenCV", "NLTK", "spaCy", 
    "Hadoop", "Spark", "Hive", "Pig", "Tableau", "Power BI", 
    "Jupyter Notebooks", "Apache Kafka", "Apache Flink",

    # Testing & QA
    "Unit Testing", "Integration Testing", "Selenium", "Cypress", 
    "Jest", "Mocha", "Chai", "Pytest", "JUnit", "TestNG", 
    "Postman", "SoapUI", "Load Testing", "Performance Testing",

    # Operating Systems
    "Linux", "Unix", "Windows", "macOS", "Shell Scripting", 
    "Bash", "Zsh", "PowerShell",

    # Version Control & Collaboration
    "Git", "GitHub", "GitLab", "Bitbucket", "SVN (Subversion)", 
    "Mercurial", "Agile Methodology", "Scrum", "Kanban",

    # Other Tools & Technologies
    "VSCode", "IntelliJ IDEA", "PyCharm", "Eclipse", "Xcode", 
    "Atom", "Sublime Text", "Vim", "Emacs", "Jupyter", 
    "Docker", "Kubernetes", "Terraform", "Ansible", "Puppet", 
    "Chef", "Nginx", "Apache", "IIS", "RabbitMQ", "Kafka", 
    "Zookeeper", "gRPC", "WebRTC", "OAuth", "JWT", "OAuth2", 
    "GraphQL", "REST", "SOAP", "CI/CD", "DevOps", "Agile",
]

def identify_skills(resume_text):
    """Identify technical skills from the resume text."""
    skills_found = []
    print("Received resume text")
    print(resume_text)
    for skill in technical_skills:
        if skill.lower() in resume_text.lower():
            skills_found.append(skill)
    print("View Fnction")
    print(skills_found)
    return skills_found