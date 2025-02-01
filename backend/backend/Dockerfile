FROM python:3.12.2-slim-bullseye

WORKDIR /usr/src/backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y netcat
RUN apt-get update && apt-get install -y poppler-utils
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /usr/src/backend/entrypoint.sh
RUN chmod +x /usr/src/backend/entrypoint.sh

COPY . .

ENTRYPOINT [ "/usr/src/backend/entrypoint.sh" ]