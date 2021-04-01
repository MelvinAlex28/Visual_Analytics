#!/usr/bin/env python
# coding: utf-8

# In[2]:


import pandas as pd
import spacy
import sklearn


# In[3]:


import nltk
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag


# In[4]:


from spacy import displacy
from collections import Counter
import en_core_web_sm
nlp = en_core_web_sm.load()


# In[5]:


df = pd.read_csv('df.csv')


# In[6]:


df1 = df
df1


# In[7]:


tokens = nlp(''.join(str(df.DATA.tolist())))
tokens


# In[8]:


items = [x.text for x in tokens.ents]
Counter(items).most_common(50)


# In[9]:


person_list = []
for ent in tokens.ents:
    if ent.label_ == 'PERSON':
        person_list.append(ent.text)
person_counts = Counter(person_list).most_common(20)

df_person = pd.DataFrame(person_counts, columns = ['Name', 'count'])


# In[10]:


df_person


# In[11]:


norp_list = []
for ent in tokens.ents:
    if ent.label_ == 'NORP':
        norp_list.append(ent.text)
norp_counts = Counter(norp_list).most_common(20)

df_norp = pd.DataFrame(norp_counts, columns = ['NORP', 'count'])


# In[12]:


df_norp


# In[13]:


org_list = []
for ent in tokens.ents:
    if ent.label_ == 'ORG':
        org_list.append(ent.text)
org_counts = Counter(org_list).most_common(20)

df_org = pd.DataFrame(org_counts, columns = ['org', 'count'])


# In[14]:


df_org


# In[15]:


event_list = []
for ent in tokens.ents:
    if ent.label_ == 'EVENT':
        event_list.append(ent.text)
event_counts = Counter(event_list).most_common(20)

df_event = pd.DataFrame(event_counts, columns = ['event', 'count'])
df_event


# In[16]:


date_list = []
for ent in tokens.ents:
    if ent.label_ == 'DATE':
        date_list.append(ent.text)
date_counts = Counter(date_list).most_common(20)

df1 = pd.DataFrame(date_counts, columns = ['date', 'count'])
df1


# In[17]:


from sklearn.feature_extraction.text import TfidfVectorizer


# In[18]:


vec = TfidfVectorizer(stop_words="english",ngram_range=(1,3))
vec.fit(df.DATA.values)
features = vec.transform(df.DATA.values)
features


# In[19]:


from sklearn.cluster import MiniBatchKMeans, KMeans


# In[20]:


clust = KMeans(init='k-means++', n_clusters=8, n_init=10)


# In[21]:


clust.fit(features)


# In[22]:


yhat=clust.predict(features)


# In[23]:


df['Cluster Labels']=clust.labels_


# In[29]:


df.to_csv('data2.csv')


# In[25]:


nlp = spacy.load('en_core_web_sm')


# In[26]:


df['doc'] = [nlp(text) for text in df.DATA]
new = df.sample(3)


# In[27]:


new


# In[28]:


for ent in new.ents:
    print(ent.text, ent.label_)


# In[ ]:


df['new_col'] = df['DATA'].apply(lambda x: nlp(x))


# In[ ]:


df


# In[ ]:


df.to


# In[ ]:





# In[ ]:





# In[ ]:




