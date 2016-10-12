FROM python:2.7

#Based on : https://github.com/visity/docker-carbon
MAINTAINER Donovan Tengblad <purplefish32@gmail.com>

RUN       addgroup --gid 30100 carbon
RUN       useradd -u 30106 -g carbon -s /bin/false carbon

# TODO 0.9.15 is the latest tag
RUN pip install twisted==11.1.0 whisper==0.9.12
RUN pip install --install-option="--prefix=/opt/graphite" carbon==0.9.12

COPY config/ /opt/graphite/conf/

ENV PYTHONPATH /opt/graphite/lib/
ENV WHISPER_AUTOFLUSH False
ENV MAX_UPDATES_PER_SECOND 500

COPY docker-entrypoint.sh /

# Ports
# 2003 newline
# 2004 delimited
# 7002 pickle
EXPOSE 2003 2004 7002

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["/opt/graphite/bin/carbon-cache.py", "--debug", "start"]
