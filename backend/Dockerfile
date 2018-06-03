FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD . /code/
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
