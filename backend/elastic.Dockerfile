FROM docker.elastic.co/elasticsearch/elasticsearch:9.1.4

RUN bin/elasticsearch-plugin install --batch analysis-nori

USER root

RUN touch config/synonyms.txt \
        && touch config/dictionary.txt

USER elasticsearch
