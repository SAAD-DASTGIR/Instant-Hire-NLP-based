import os
import sys
import spacy
import PyPDF2
import re
from datetime import datetime
from transformers import BertTokenizer, BertModel
import torch
from scipy.spatial.distance import cosine

# Initialize SpaCy and BERT
nlp = spacy.load('en_core_web_sm')
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

def read_text_from_pdf(file_path):
    text = ""
    with open(file_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            page_text = page.extract_text() if page.extract_text() else ""
            text += page_text
    return text

def extract_education(text):
    patterns = {
        'phd': re.compile(r'\b(ph\.?d|doctorate)\b', re.IGNORECASE),
        'master': re.compile(r'\b(master\'?s?|msc)\b', re.IGNORECASE),
        'bachelor': re.compile(r'\b(bachelor\'?s?|bsc|ba)\b', re.IGNORECASE),
    }
    for level, pattern in patterns.items():
        if pattern.search(text):
            return level
    return None

def extract_experience(text, is_jd=False):
    total_years = 0
    if is_jd:
        matches = re.findall(r'(\d+)\s+years?', text.lower())
        total_years = max(int(year) for year in matches) if matches else 0
    else:
        ranges = re.findall(r'(\d{4})\s*[-–]\s*(\d{4}|present)', text.lower())
        for start, end in ranges:
            start_year, end_year = int(start), int(end) if end.isdigit() else datetime.now().year
            total_years += end_year - start_year + 1
        distinct_years = set(re.findall(r'\b\d{4}\b', text.lower()))
        total_years = max(total_years, len(distinct_years))
    return total_years

def extract_skills(text):
    skills_list = [
        'javascript', 'python', 'react', 'node.js', 'angular', 'css', 'html',
        'django', 'flask', 'ruby on rails', 'vue.js', 'typescript', 'java',
        'c#', '.net', 'php', 'swift', 'kotlin', 'sql', 'mongodb', 'postgres',
        'docker', 'aws', 'azure', 'git', 'rest', 'graphql', 'sass', 'less',
        'webpack', 'babel', 'redux', 'rxjs', 'mobx', 'npm', 'yarn',
        'jenkins', 'travis ci', 'gitlab ci', 'azure devops',
        # Add more skills as needed
    ]
    found_skills = [skill for skill in skills_list if skill in text.lower()]
    return found_skills

def text_to_embedding(text, tokenizer, model):
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512)
    outputs = model(**inputs)
    embeddings = outputs.last_hidden_state
    mean_embedding = torch.mean(embeddings, dim=1).squeeze().detach().numpy()
    return mean_embedding

def calculate_similarity(text1, text2, tokenizer, model):
    embedding1 = text_to_embedding(text1, tokenizer, model)
    embedding2 = text_to_embedding(text2, tokenizer, model)
    similarity = 1 - cosine(embedding1, embedding2)
    return similarity

def calculate_experience_score(candidate_years, required_years):
    if candidate_years >= required_years:
        return 1
    elif candidate_years > 0:
        return candidate_years / required_years
    else:
        return 0

def calculate_cumulative_score(resume_text, job_description_text, tokenizer, model):
    education_weight = 2
    experience_weight = 5
    skills_weight = 3

    resume_education_level = extract_education(resume_text)
    job_education_level = extract_education(job_description_text)
    education_score = 1 if resume_education_level == job_education_level else 0

    resume_experience_years = extract_experience(resume_text, is_jd=False)
    job_experience_years = extract_experience(job_description_text, is_jd=True)
    experience_score = calculate_experience_score(resume_experience_years, job_experience_years)

    resume_skills = extract_skills(resume_text)
    job_skills = extract_skills(job_description_text)
    skills_similarity = calculate_similarity(' '.join(resume_skills), ' '.join(job_skills), tokenizer, model)

    cumulative_score = (education_score * education_weight + experience_score * experience_weight + skills_similarity * skills_weight) / (education_weight + experience_weight + skills_weight)
    cumulative_percentage = cumulative_score * 100

    return cumulative_percentage

# if __name__ == "__main__":
#     if len(sys.argv) != 2:
#         print("Usage: python app.py <file_path>")
#         sys.exit(1)
    
#     file_path = sys.argv[1]
#     resume_text = read_text_from_pdf(file_path)
#     print(calculate_cumulative_score(resume_text, "Your job description text here", tokenizer, model))

# if __name__ == "__main__":
#     if len(sys.argv) != 2:
#         print("Usage: python app.py <file_path>")
#         sys.exit(1)
    
#     file_path = sys.argv[1]
#     if not os.path.isfile(file_path):
#         print(f"Error: File '{file_path}' not found.")
#         sys.exit(1)
    
#     resume_text = read_text_from_pdf(file_path)
#     print(calculate_cumulative_score(resume_text, "Your job description text here", tokenizer, model))

# if __name__ == "__main__":
#     if len(sys.argv) != 3: # Ensure two command line arguments: file path and job description
#         print("Usage: python resume-score.py <file_path> <job_description>")
#         sys.exit(1)
    
#     file_path = sys.argv[1]
#     if not os.path.isfile(file_path):
#         print(f"Error: File '{file_path}' not found.")
#         sys.exit(1)
    
#     job_description = sys.argv[2] # Get job description from command line arguments
#     resume_text = read_text_from_pdf(file_path)
#     print(calculate_cumulative_score(resume_text, job_description, tokenizer, model))


# if __name__ == "__main__":
#     if len(sys.argv) != 3:
#         print("Usage: python resume-score.py <file_path> <job_description>")
#         sys.exit(1)
    
#     file_path = sys.argv[1]
#     if not os.path.isfile(file_path):
#         print(f"Error: File '{file_path}' not found.")
#         sys.exit(1)
    
#     job_description = sys.argv[2]
#     try:
#         resume_text = read_text_from_pdf(file_path)
#         score = calculate_cumulative_score(resume_text, job_description, tokenizer, model)
#         print(score)
#     except Exception as e:
#         print(f"Error: {e}")
#         sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python resume-score.py <file_path> <job_description>")
        sys.exit(1)
    
    file_path = sys.argv[1]
    if not os.path.isfile(file_path):
        print(f"Error: File '{file_path}' not found.")
        sys.exit(1)
    
    job_description = sys.argv[2]
    try:
        resume_text = read_text_from_pdf(file_path)
        score = calculate_cumulative_score(resume_text, job_description, tokenizer, model)
        print(score)
    except Exception as e:
        print(f"Error: saad")
        sys.exit(1)
