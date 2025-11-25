FROM docker.elastic.co/elasticsearch/elasticsearch:9.1.4

RUN bin/elasticsearch-plugin install --batch analysis-nori

USER root

COPY dictionary.txt ./config
COPY synonyms.txt ./config

USER elasticsearch
