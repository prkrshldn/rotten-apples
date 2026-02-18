function ratingcolor(score) {
  if (100 < score || score > 91) {
    return "#00FF00";
  } else if (90 < score || score > 81) {
    return "#93C47D";
  } else if (80 < score || score > 71) {
    return "#B6D7A8";
  } else if (70 < score || score > 61) {
    return "#FFFF00";
  } else if (60 < score || score > 51) {
    return "#FFD966";
  } else if (50 < score || score > 41) {
    return "#FFE599";
  }
}

function songcolor(score) {
  if (10 < score || score > 9.1) {
    return "#6766ff";
  } else if (9.0 < score || score > 8.1) {
    return "#93C47D";
  } else if (8.0 < score || score > 7.1) {
    return "#B6D7A8";
  } else if (7.0 < score || score > 6.1) {
    return "#FFFF00";
  } else if (6.0 < score || score > 5.1) {
    return "#FFD966";
  } else if (5.0 < score || score > 4.1) {
    return "#FFE599";
  }
}

export { ratingcolor, songcolor };