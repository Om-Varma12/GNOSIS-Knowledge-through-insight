from ai.services.vectors import getVector  
from ai.agents.explainer import explain
from ai.utils.confidenceScore import getConfidenceScore
from ai.agents.queryTransformer import transformQuery
from ai.agents.evidence import getEvidence
import json

def invokeEngine(data):
    query = transformQuery(data)
    print(f"\n\n New Query: {query} \n\n")
    
    vectors = getVector(query)
        
    print(f"\n\n {vectors} \n\n")
    
    summary = explain(vectors)
    confidence = getConfidenceScore(vectors)
    
    # print(json.dumps(summary, indent=2, ensure_ascii=False))
    
    evidence = getEvidence(query)
    
    return {
        "final_verdict": vectors["final_verdict"],
        "confidence_score": confidence,
        "summary": summary,
        "evidence": evidence
    }

print(invokeEngine("did rahul gandhi become prime minister of india in 2024?"))