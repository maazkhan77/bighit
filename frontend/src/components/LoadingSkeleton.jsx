import { Card, CardContent, Grid, Skeleton } from "@mui/material";
import React from "react";

const LoadingSkeleton = () => {
  return (
    <Grid item xs={4} sm={4} md={4}>
      <Card sx={{ maxWidth: 400, margin: "8px" }}>
        <CardContent>
          <Skeleton variant="rect" width="100%" height={30} animation="wave" />
          <Skeleton variant="text" animation="wave" />
          <Skeleton variant="text" animation="wave" />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default LoadingSkeleton;
