import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Stars = ({ nb }) => {
  let i = 0;
  return (
    <View style={styles.container}>
      {i++ < nb ? (
        <FontAwesome
          name="star"
          size={16}
          color="#FFB101"
          style={styles.star}
        />
      ) : (
        <FontAwesome
          name="star"
          size={16}
          color="#BBBCBB"
          style={styles.star}
        />
      )}
      {i++ < nb ? (
        <FontAwesome
          name="star"
          size={16}
          color="#FFB101"
          style={styles.star}
        />
      ) : (
        <FontAwesome
          name="star"
          size={16}
          color="#BBBCBB"
          style={styles.star}
        />
      )}
      {i++ < nb ? (
        <FontAwesome
          name="star"
          size={16}
          color="#FFB101"
          style={styles.star}
        />
      ) : (
        <FontAwesome
          name="star"
          size={16}
          color="#BBBCBB"
          style={styles.star}
        />
      )}
      {i++ < nb ? (
        <FontAwesome
          name="star"
          size={16}
          color="#FFB101"
          style={styles.star}
        />
      ) : (
        <FontAwesome
          name="star"
          size={16}
          color="#BBBCBB"
          style={styles.star}
        />
      )}
      {i++ < nb ? (
        <FontAwesome
          name="star"
          size={16}
          color="#FFB101"
          style={styles.star}
        />
      ) : (
        <FontAwesome
          name="star"
          size={16}
          color="#BBBCBB"
          style={styles.star}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginRight: 6,
  },
  star: {
    marginRight: 4,
  },
});

export default Stars;
