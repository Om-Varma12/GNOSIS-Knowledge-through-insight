from ai.services.vectors import getVector  
from ai.services.images import getImages

from ai.utils.confidenceScore import getConfidenceScore
from ai.utils.vectorSort import sortVectors

from ai.agents.queryTransformer import transformQuery
from ai.agents.explainer import explain
from ai.agents.evidence import getEvidence
from ai.agents.impacter import getFutureImpacts

def invokeEngine(data):    
    query = transformQuery(data)
    print(f"\n\n New Query: {query} \n\n")
    
    vectors = getVector(query)
        
    print(f"\n\n {vectors} \n\n")
    
    summary = explain(vectors)
    confidence = getConfidenceScore(vectors)
    
    # print(json.dumps(summary, indent=2, ensure_ascii=False))
    
    evidence = getEvidence(query)
    sortedVector = sortVectors(evidence)
    impacts = getFutureImpacts(evidence)
    images = getImages(query)
    
    return {
        "final_verdict": vectors["final_verdict"],
        "confidence_score": confidence,
        "summary": summary,
        "evidence": evidence,
        "video_url": vectors["video"]["items"][0]["url"],
        "track": sortedVector,
        "impacts": impacts,
        "images": images
    }

print(invokeEngine("is it true that sonu sood took all the campaign money and gave a really small portion of it?"))