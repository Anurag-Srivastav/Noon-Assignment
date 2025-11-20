import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  ScrollView,
  View,
  Dimensions,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import Image from "./Image";
import { vh, vw } from "../utils/dimensions";

const deviceWidth = Dimensions.get("window").width;
const H_PADDING = vw(12);
const BANNER_WIDTH = deviceWidth - vw(20) - H_PADDING * 2;

type Props = {
  banners: string[];
};

function BannerCarouselComponent({ banners }: Props) {
  const scrollRef = useRef<ScrollView>(null);
  const activeIndexRef = useRef(0);  
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = activeIndexRef.current + 1;

      if (nextIndex >= banners.length) nextIndex = 0;

      scrollRef.current?.scrollTo({
        x: nextIndex * (BANNER_WIDTH + vw(12)),
        animated: true,
      });

      activeIndexRef.current = nextIndex;
    }, 2000);

    return () => clearInterval(interval);
  }, [banners.length]);


  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollX = event.nativeEvent.contentOffset.x;
      const index = Math.round(scrollX / (BANNER_WIDTH + vw(12)));

      if (index !== activeIndex) {
        setActiveIndex(index);
        activeIndexRef.current = index;
      }
    },
    []
  );

  const renderBanner = useCallback(
    (banner: string, index: number) => (
      <Image
        key={index}
        source={{ uri: banner }}
        style={[styles.banner, { width: BANNER_WIDTH }]}
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={BANNER_WIDTH + vw(H_PADDING)}
        snapToAlignment="start"
        decelerationRate="fast"
      >
        {banners.map(renderBanner)}
      </ScrollView>

      <View style={styles.dotContainer}>
        {banners.map((_, i) => {
          const isActive = i === activeIndex;
          return (
            <View
              key={i}
              style={[
                styles.dot,
                isActive ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

export default React.memo(BannerCarouselComponent); 

const styles = StyleSheet.create({
  container: {
    height: vh(180),
  },
  scrollContent: {
    paddingHorizontal: H_PADDING,
  },
  banner: {
    height: vh(130),
    borderRadius: vw(8),
    marginRight: vw(12),
    backgroundColor: "#f2f2f2",
  },
  dotContainer: {
    position: "absolute",
    bottom: vh(12),
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: vw(8),
    height: vw(8),
    borderRadius: vw(4),
    marginHorizontal: vw(4),
  },
  activeDot: {
    backgroundColor: "#111",
    width: vw(10),
    height: vw(10),
  },
  inactiveDot: {
    backgroundColor: "#bbb",
  },
});
