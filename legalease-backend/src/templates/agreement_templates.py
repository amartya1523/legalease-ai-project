"""
Legal Agreement Templates with Predefined Points
This module contains comprehensive templates for different types of legal agreements
with predefined clauses and structure to ensure legal accuracy and completeness.
"""

def get_service_agreement_template():
    """Service Agreement Template with predefined legal points"""
    return {
        "title": "SERVICE AGREEMENT",
        "sections": [
            {
                "title": "PARTIES",
                "content": """This Service Agreement (the "Agreement") is made and entered into as of {start_date} (the "Effective Date"), by and between:

{service_provider_name}, with its principal place of business at {service_provider_address}, (the "Service Provider"),

AND

{client_name}, with its principal place of business at {client_address}, (the "Client").

WHEREAS, the Service Provider is engaged in the business of providing {service_category}; and
WHEREAS, the Client desires to retain the Service Provider to perform certain services as set forth herein."""
            },
            {
                "title": "1. SERVICES",
                "content": """The Service Provider agrees to perform the following services (the "Services") for the Client:

{service_description}

The Services shall be performed in a professional and workmanlike manner in accordance with industry standards and best practices. The Service Provider shall use commercially reasonable efforts to complete the Services within the timeframe specified in this Agreement."""
            },
            {
                "title": "2. COMPENSATION",
                "content": """In consideration for the Services, the Client shall pay the Service Provider the sum of {service_fee}.

Payment Terms: {payment_terms}

All payments shall be made in U.S. dollars. Late payments may be subject to a service charge of 1.5% per month or the maximum rate permitted by law, whichever is less."""
            },
            {
                "title": "3. TERM AND TERMINATION",
                "content": """This Agreement shall commence on the Effective Date and shall continue in full force and effect until {end_date}, unless earlier terminated in accordance with the provisions of this Agreement.

Either party may terminate this Agreement upon thirty (30) days' written notice to the other party. In the event of termination, the Client shall pay for all Services performed up to the date of termination."""
            },
            {
                "title": "4. CONFIDENTIALITY",
                "content": """Both parties acknowledge that they may have access to confidential information of the other party. Each party agrees to maintain the confidentiality of such information and not to disclose it to any third party without the prior written consent of the disclosing party."""
            },
            {
                "title": "5. INTELLECTUAL PROPERTY",
                "content": """All work product, deliverables, and intellectual property created by the Service Provider in the performance of the Services shall be owned by the Client upon full payment of all fees due hereunder."""
            },
            {
                "title": "6. INDEMNIFICATION",
                "content": """Each party agrees to indemnify and hold harmless the other party from and against any and all claims, losses, damages, liabilities, and expenses (including reasonable attorneys' fees) arising out of or resulting from the indemnifying party's breach of this Agreement or negligent or wrongful acts."""
            },
            {
                "title": "7. LIMITATION OF LIABILITY",
                "content": """IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, REGARDLESS OF THE THEORY OF LIABILITY."""
            },
            {
                "title": "8. GOVERNING LAW",
                "content": """This Agreement shall be governed by and construed in accordance with the laws of {governing_state}, without regard to its conflict of laws principles."""
            },
            {
                "title": "9. ENTIRE AGREEMENT",
                "content": """This Agreement constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, or agreements relating to the subject matter hereof."""
            }
        ],
        "signature_block": """IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.

SERVICE PROVIDER:                    CLIENT:

_____________________________       _____________________________
{service_provider_name}              {client_name}

By: _________________________       By: _________________________
Name:                               Name:
Title:                              Title:
Date:                               Date:"""
    }

def get_rental_agreement_template():
    """Rental Agreement Template with predefined legal points"""
    return {
        "title": "RESIDENTIAL RENTAL AGREEMENT",
        "sections": [
            {
                "title": "PARTIES AND PROPERTY",
                "content": """This Residential Rental Agreement (the "Agreement") is made between {landlord_name} ("Landlord") and {tenant_name} ("Tenant") for the rental of the property located at:

{property_address}

(the "Premises")."""
            },
            {
                "title": "1. TERM",
                "content": """The term of this Agreement shall be for {duration}, commencing on {start_date} and ending on {end_date}, unless terminated earlier in accordance with the terms hereof."""
            },
            {
                "title": "2. RENT",
                "content": """Tenant agrees to pay rent in the amount of {rent_amount} per month, due on the first day of each month. Rent payments shall be made to Landlord at the address specified herein or such other address as Landlord may designate in writing.

A late fee of $50.00 will be charged for rent payments received after the 5th day of the month."""
            },
            {
                "title": "3. SECURITY DEPOSIT",
                "content": """Tenant shall pay a security deposit of {security_deposit} upon execution of this Agreement. The security deposit shall be held by Landlord as security for the faithful performance of Tenant's obligations hereunder."""
            },
            {
                "title": "4. USE OF PREMISES",
                "content": """The Premises shall be used solely as a private residential dwelling. No commercial activities shall be conducted on the Premises without Landlord's prior written consent."""
            },
            {
                "title": "5. MAINTENANCE AND REPAIRS",
                "content": """Landlord shall maintain the Premises in habitable condition and make necessary repairs to keep the property in good working order. Tenant shall be responsible for minor maintenance and shall promptly notify Landlord of any needed repairs."""
            },
            {
                "title": "6. PETS",
                "content": """No pets shall be kept on the Premises without Landlord's prior written consent. If pets are permitted, an additional pet deposit may be required."""
            },
            {
                "title": "7. TERMINATION",
                "content": """This Agreement may be terminated by either party upon thirty (30) days' written notice. Landlord may terminate immediately for breach of any term of this Agreement."""
            },
            {
                "title": "8. ADDITIONAL TERMS",
                "content": """{terms}"""
            }
        ],
        "signature_block": """LANDLORD:                           TENANT:

_____________________________       _____________________________
{landlord_name}                      {tenant_name}
Date: _______________________       Date: _______________________"""
    }

def get_employment_agreement_template():
    """Employment Agreement Template with predefined legal points"""
    return {
        "title": "EMPLOYMENT AGREEMENT",
        "sections": [
            {
                "title": "PARTIES",
                "content": """This Employment Agreement (the "Agreement") is made between {employer_name} (the "Company") and {employee_name} (the "Employee")."""
            },
            {
                "title": "1. POSITION AND DUTIES",
                "content": """Employee is hereby employed in the position of {job_title}. Employee agrees to perform such duties and responsibilities as may be assigned by the Company from time to time."""
            },
            {
                "title": "2. TERM",
                "content": """Employment shall commence on {joining_date}. This Agreement shall continue until terminated by either party in accordance with the terms hereof."""
            },
            {
                "title": "3. COMPENSATION",
                "content": """As compensation for services rendered, Employee shall receive a salary of {salary} per year, payable in accordance with the Company's regular payroll practices."""
            },
            {
                "title": "4. PROBATIONARY PERIOD",
                "content": """Employee's employment shall be subject to a probationary period of {probation_period}. During this period, either party may terminate employment with or without cause upon written notice."""
            },
            {
                "title": "5. BENEFITS",
                "content": """Employee shall be entitled to participate in such employee benefit plans as the Company may maintain from time to time, subject to the terms and conditions of such plans."""
            },
            {
                "title": "6. CONFIDENTIALITY",
                "content": """Employee acknowledges that during employment, Employee may have access to confidential information. Employee agrees to maintain the confidentiality of such information both during and after employment."""
            },
            {
                "title": "7. TERMINATION",
                "content": """Either party may terminate this Agreement at any time, with or without cause, upon two (2) weeks' written notice to the other party."""
            },
            {
                "title": "8. NON-COMPETE",
                "content": """During employment and for a period of one (1) year thereafter, Employee agrees not to engage in any business that directly competes with the Company's business."""
            }
        ],
        "signature_block": """COMPANY:                            EMPLOYEE:

_____________________________       _____________________________
{employer_name}                      {employee_name}

By: _________________________       Date: _______________________
Name:
Title:
Date: _______________________"""
    }

def get_nda_template():
    """Non-Disclosure Agreement Template with predefined legal points"""
    return {
        "title": "NON-DISCLOSURE AGREEMENT",
        "sections": [
            {
                "title": "PARTIES",
                "content": """This Non-Disclosure Agreement (the "Agreement") is made between {disclosing_party} (the "Disclosing Party") and {receiving_party} (the "Receiving Party")."""
            },
            {
                "title": "1. CONFIDENTIAL INFORMATION",
                "content": """For purposes of this Agreement, "Confidential Information" means:

{confidential_info}

And any other information that is marked as confidential or that a reasonable person would consider confidential under the circumstances."""
            },
            {
                "title": "2. OBLIGATIONS",
                "content": """Receiving Party agrees to:
a) Hold all Confidential Information in strict confidence;
b) Not disclose Confidential Information to any third party without prior written consent;
c) Use Confidential Information solely for the purpose of evaluating potential business relationships;
d) Take reasonable precautions to protect the confidentiality of such information."""
            },
            {
                "title": "3. TERM",
                "content": """This Agreement shall be effective as of {effective_date} and shall remain in effect for {nda_duration}, unless terminated earlier by mutual written consent."""
            },
            {
                "title": "4. RETURN OF INFORMATION",
                "content": """Upon termination of this Agreement or upon request by Disclosing Party, Receiving Party shall promptly return or destroy all materials containing Confidential Information."""
            },
            {
                "title": "5. REMEDIES",
                "content": """Receiving Party acknowledges that any breach of this Agreement may cause irreparable harm to Disclosing Party, and that monetary damages may be inadequate. Therefore, Disclosing Party shall be entitled to seek injunctive relief."""
            },
            {
                "title": "6. GOVERNING LAW",
                "content": """This Agreement shall be governed by the laws of {governing_state}."""
            }
        ],
        "signature_block": """DISCLOSING PARTY:                   RECEIVING PARTY:

_____________________________       _____________________________
{disclosing_party}                   {receiving_party}
Date: _______________________       Date: _______________________"""
    }

def get_template_by_type(agreement_type):
    """Get the appropriate template based on agreement type"""
    templates = {
        'service': get_service_agreement_template,
        'rental': get_rental_agreement_template,
        'employment': get_employment_agreement_template,
        'nda': get_nda_template
    }
    
    template_func = templates.get(agreement_type)
    if template_func:
        return template_func()
    else:
        # Return a basic template for custom agreements
        return {
            "title": "LEGAL AGREEMENT",
            "sections": [
                {
                    "title": "PARTIES",
                    "content": "This Agreement is made between the parties as specified."
                },
                {
                    "title": "TERMS",
                    "content": "{custom_agreement}"
                }
            ],
            "signature_block": """PARTY 1:                            PARTY 2:

_____________________________       _____________________________
Signature                           Signature
Date: _______________________       Date: _______________________"""
        }

def format_template(template, form_data):
    """Format template with form data, providing defaults for missing fields"""
    
    # Default values for common fields
    defaults = {
        'service_provider_address': '[Service Provider Address]',
        'client_address': '[Client Address]',
        'payment_terms': 'Net 30 days',
        'governing_state': '[State/Province]',
        'service_category': 'professional services',
        'security_deposit': '[Security Deposit Amount]',
        'start_date': form_data.get('startDate', '[Start Date]'),
        'end_date': form_data.get('endDate', '[End Date]')
    }
    
    # Merge form_data with defaults
    format_data = {**defaults, **form_data}
    
    # Format each section
    formatted_sections = []
    for section in template['sections']:
        try:
            formatted_content = section['content'].format(**format_data)
            formatted_sections.append({
                'title': section['title'],
                'content': formatted_content
            })
        except KeyError as e:
            # If a key is missing, use the original content with a note
            formatted_sections.append({
                'title': section['title'],
                'content': section['content'] + f"\n\n[Note: Missing field {e}]"
            })
    
    # Format signature block
    try:
        formatted_signature = template['signature_block'].format(**format_data)
    except KeyError:
        formatted_signature = template['signature_block']
    
    return {
        'title': template['title'],
        'sections': formatted_sections,
        'signature_block': formatted_signature
    }

