import React from "react";
import { Container, Typography, Grid, Paper, Card, CardContent, CardMedia } from "@mui/material";

const teamMembers = [
  {
    name: "Jorge Martínez",
    role: "Director Creativo",
    image: "/assets/team1.jpg",
    description: "Encargado de la visión artística y narrativa de PotLand."
  },
  {
    name: "Elena Ramírez",
    role: "Desarrolladora Principal",
    image: "/assets/team2.jpg",
    description: "Programadora responsable del código y la funcionalidad del juego."
  },
  {
    name: "Carlos Herrera",
    role: "Diseñador de Personajes",
    image: "/assets/team3.jpg",
    description: "Creador de los personajes y criaturas que habitan PotLand."
  }
];

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Sobre PotLand
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          PotLand es un videojuego independiente de exploración y combate en un mundo de fantasía. Nuestro equipo está dedicado a ofrecer una experiencia única e inmersiva para los jugadores.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          Nuestro Equipo
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia component="img" height="200" image={member.image} alt={member.name} />
                <CardContent>
                  <Typography variant="h6">{member.name}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">{member.role}</Typography>
                  <Typography variant="body2">{member.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default About;
