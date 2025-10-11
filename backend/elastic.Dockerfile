FROM docker.elastic.co/elasticsearch/elasticsearch:9.1.4 

RUN bin/elasticsearch-plugin install --batch analysis-nori

USER root

RUN echo -e "" > config/synonyms.txt \
    && echo -e "" > config/dictionary.txt

USER elasticsearch
