# For sentence polarity 


#very negative
sen = "Whenever someone is upset, they just need to toughen up and stop complaining. Emotions are just a sign of weakness. I don't see why people make such a big deal out of their feelings. It's all in their heads, and they should get over it."
result = evaluate_emotional_intelligence(sen)
print(result)
#moderate
sen = "I think emotions are important, but sometimes people can be overly sensitive. It's essential to consider other people's feelings, but we shouldn't dwell on our own emotions too much. Life has its ups and downs, and we should learn to cope with them."
result = evaluate_emotional_intelligence(sen)
print(result)
#very positive 
sen = "I believe that emotions are a fundamental part of being human. They provide us with valuable insights into our thoughts and needs. It's crucial to be empathetic and supportive when others are going through difficult times. At the same time, it's essential to recognize our emotions and find healthy ways to manage and express them. Emotional intelligence enables us to connect with others on a deeper level and navigate life's challenges with resilience."
result = evaluate_emotional_intelligence(sen)
print(result)


# For comparing answers using BERT-COgen



sent1 = 'i like honest people'
sent2 = 'i like calm people'
print(compare_answers(sent1,sent2)) # -> 0.39

sent1 = 'i like honest people'
sent2 = 'i like integrity in people'
print(compare_answers(sent1,sent2)) # -> 0.79


# For number Grammatical errors
sent = "Their is many peoples who enjoys to eat ice cream in the summer. Me and my friend goes to the beach yesterday and we was having a great time. But then, it started raining and we gets all wet. We should of bring an umbrella with us."
print(num_gramm_errors(sent)) # -> 8

sent = 'I has a apple'
print(num_gramm_errors(sent)) # -> 2


print(smallmodel("I am an energetic person, an effective communicator, and a quick learner. I was also one of the top students in my batch while I was pursuing a B.E degree in the XYZ domain. I worked on various projects related to the software domain which provided me a great deal of technical exposure along with the importance of working in a team and the value of client satisfaction. I have worked on developing various enterprise-level web applications for helping companies solve problems like ensuring business continuity, market research analysis, etc. So, I believe I am a good fit for technology-centric roles in your company."))

