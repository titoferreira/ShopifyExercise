create table events(
    code SERIAL primary key,
    name varchar(20) NOT NULL
);

create table emails(
    id SERIAL primary key,
    recipient varchar(30) NOT NULL,
    event integer NOT NULL,
    content TEXT NOT NULL,
    html_content TEXT NOT NULL,
    sent_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_emails FOREIGN KEY (event) REFERENCES events(code) ON DELETE CASCADE
);

create table templates(
    event integer NOT NULL primary key,
    template TEXT NOT NULL,
    CONSTRAINT fk_templates FOREIGN KEY (event) REFERENCES events(code) ON DELETE CASCADE
);