FROM golang:1.21-alpine

WORKDIR /app

RUN apk add --no-cache git

COPY go.mod ./
#COPY go.sum ./
RUN go mod download

COPY . .

RUN go build -o service-reportes

EXPOSE 6001

CMD ["./service-reportes"]
