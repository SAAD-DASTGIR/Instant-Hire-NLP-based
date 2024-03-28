from flask import Flask, request
import re
import spacy
from spacy.matcher import Matcher
from nltk.corpus import stopwords
from tika import parser
import json

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, Flask!'

@app.route('/parse-resume', methods=['POST'])
def process_file():
    file_path = request.form['filePath']
    
    print('File path received:', file_path)

    file_data = parser.from_file(file_path)
    
    text = file_data['content']
    text = text

    extracted_text = {}
    def get_email_addresses(string):
        r = re.compile(r'[\w\.-]+@[\w\.-]+')
        return r.findall(string)

    email_list = get_email_addresses(text)

    if email_list:
        extracted_text["email"] = email_list[0]
    else:
        extracted_text["email"] = ""

    def get_phone_numbers(string):
        r = re.compile(r'(\d{3}[-\.\s]??\d{3}[-\.\s]??\d{4}|\(\d{3}\)\s*\d{3}[-\.\s]??\d{4}|\d{3}[-\.\s]??\d{4})')
        phone_numbers = r.findall(string)
        return [re.sub(r'\D', '', num) for num in phone_numbers]

    phone_number= get_phone_numbers(text)
    extracted_text["phone"] = phone_number

    nlp = spacy.load('en_core_web_sm')
    matcher = Matcher(nlp.vocab)
    def extract_name(resume_text):
        doc = nlp(resume_text)
        names = []

        for ent in doc.ents:
            if ent.label_ == 'PERSON':
                names.append(ent.text)

        if names:
            # Filter the names based on common name prefixes and suffixes
            filtered_names = filter_common_name_patterns(names)
            if filtered_names:
                return filtered_names  # Return all filtered names

        return []

    def filter_common_name_patterns(names):
        # Define common name prefixes and suffixes to filter out
        name_prefixes = ['Mr.', 'Mrs.', 'Ms.', 'Dr.']
        name_suffixes = ['Jr.', 'Sr.', 'Ph.D.']

        filtered_names = []
        for name in names:
            # Check if the name starts with a prefix or ends with a suffix
            if not any(name.startswith(prefix) for prefix in name_prefixes) and not any(name.endswith(suffix) for suffix in name_suffixes):
                filtered_names.append(name)

        return filtered_names
        
    name = extract_name(text)
    extracted_text["name"] = name

    nlp = spacy.load('en_core_web_sm')

    def extract_skills(resume_text):
        nlp_text = nlp(resume_text)

        tokens = [token.text for token in nlp_text if not token.is_stop]
        
        skills = ["machine learning",
                "deep learning",
                "nlp",
                "natural language processing",
                "mysql",
                "sql",
                "django",
                "computer vision",
                "tensorflow",
                "opencv",
                "mongodb",
                "react",
                "bootstrap",
                "mern",
                "express",
                "mobile app",
                "node",
                "web app"
                "mongo",
                "sql",
                "web",
                "artificial intelligence",
                "ai",
                "flask",
                "robotics",
                "data structures",
                "python",
                "c++",
                "matlab",
                "css",
                "html",
                "github",
                "php"]
        
        skillset = []
        
        for token in tokens:
            if token.lower() in skills:
                skillset.append(token)
        
        # check for bi-grams and tri-grams (example: machine learning)
        for token in nlp_text.noun_chunks:
            token = token.text.lower().strip()
            if token in skills:
                skillset.append(token)
        
        return [i.capitalize() for i in set([i.lower() for i in skillset])]

    skills = []
    skills = extract_skills(text)
    extracted_text["skills"] = skills

    # load pre-trained model
    nlp = spacy.load('en_core_web_sm')

    # Grad all general stop words
    STOPWORDS = set(stopwords.words('english'))

    # Education Degrees
    EDUCATION = [
                'Bsc','B.E.', 'B.E', 'BS', 'B.S', 
                'ME', 'M.E', 'M.E.', 'MS', 'M.S', 
                'BTECH', 'B.TECH', 'M.TECH', 'MTECH', 
                'SSC', 'HSC', 'CBSE', 'ICSE', 'X', 'XII'
            ]

    def extract_education(resume_text):
        nlp_text = nlp(resume_text)

        # Sentence Tokenizer
        nlp_text = [sent.text.strip() for sent in nlp_text.sents]

        edu = {}
        # Extract education degree
        for index, text in enumerate(nlp_text):
            for tex in text.split():
                # Replace all special symbols
                tex = re.sub(r'[?|$|.|!|,]', r'', tex)
                if tex.upper() in EDUCATION and tex not in STOPWORDS:
                    if index + 1 < len(nlp_text):
                        edu[tex] = text + nlp_text[index + 1]
                    else:
                        edu[tex] = text

        education = []
        for key in edu.keys():
            year = re.search(re.compile(r'(((20|19)(\d{2})))'), edu[key])
            if year:
                education.append((key, ''.join(year[0])))
            else:
                education.append(key)
        return education

    education = extract_education(text)
    extracted_text["qualification"] = education

    sub_patterns = ['[A-Z][a-z]* University','[A-Z][a-z]* Educational Institute',
                    'University of [A-Z][a-z]*',
                    'Ecole [A-Z][a-z]*']
    pattern = '({})'.format('|'.join(sub_patterns))
    matches = re.findall(pattern, text)

    extracted_text["institutes"] = matches

    sub_patterns = ['[A-Z][a-z]* [A-Z][a-z]* Private Limited','[A-Z][a-z]* [A-Z][a-z]* Pvt. Ltd.','[A-Z][a-z]* [A-Z][a-z]* Inc.', '[A-Z][a-z]* LLC',]
    pattern = '({})'.format('|'.join(sub_patterns))
    Exp = re.findall(pattern, text)
    extracted_text["experience"] = Exp

    extracted_text["path"] = file_path

    # Convert the dictionary to a JSON string
    json_str = json.dumps(extracted_text)

    return json_str 


if __name__ == '__main__':
    app.run(port=8088)
