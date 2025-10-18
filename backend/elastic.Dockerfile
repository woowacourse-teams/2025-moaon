FROM docker.elastic.co/elasticsearch/elasticsearch:9.1.4

RUN bin/elasticsearch-plugin install --batch analysis-nori

USER root

RUN mkdir config/user_dic \
    && echo -e "자바, java\n도커, docker" > config/user_dic/article_syn_dic.txt

USER elasticsearch
