import React, { FC, useMemo, ReactNode } from "react";

// =================================================================
// БАЗОВІ HTML-ОБГОРТКИ (Div, Span, Img)
// Вони починаються з великої літери, щоб уникнути Invariant Violation.
// =================================================================

// 1. Універсальні властивості для View, Text, Pressable (які є Div/Span)
interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement | HTMLSpanElement>) => void;
  role?: string;
  tabIndex?: number;
}

const Div: FC<BaseProps> = (props) => <div {...props} />;
const Span: FC<BaseProps> = (props) => <span {...props} />;

const Img: FC<{
  className?: string;
  style?: React.CSSProperties;
  src: string;
  alt: string;
  onError: React.ReactEventHandler<HTMLImageElement>;
}> = (props) => <img {...props} />;

// =================================================================
// ІМІТАЦІЯ NATIVE КОМПОНЕНТІВ
// =================================================================

// Імітація <View>
const View: FC<BaseProps> = (props) => <Div {...props} />;

// Імітація <Text>
const Text: FC<BaseProps> = (props) => <Span {...props} />;

// Імітація <Image>
const Image: FC<{
  className?: string;
  style?: React.CSSProperties;
  source: { uri: string };
  alt: string;
}> = ({ className, style, source, alt }) => (
  <Img
    src={source.uri}
    alt={alt}
    className={className}
    style={style}
    onError={(e) => {
      // Обробник помилок зображення
      const target = e.currentTarget as HTMLImageElement;
      target.onerror = null;
      target.src = "https://placehold.co/420x680/e67d56/ffffff?text=Load+Error";
    }}
  />
);

// Імітація <Pressable>
const Pressable: FC<BaseProps> = ({ className, children, ...props }) => (
  <Div
    role="button"
    tabIndex={0}
    className={`${className} cursor-pointer select-none`}
    {...props}
  >
    {children}
  </Div>
);

// =================================================================
// 2. СПЕЦІАЛІЗОВАНІ SVG-КОМПОНЕНТИ ТА ЇХНІ ВЛАСТИВОСТІ
// =================================================================

// 2.1. Властивості SVG-елементів
interface SVGProps {
  className?: string;
  fill?: string;
  stroke?: string;
  viewBox?: string;
  xmlns?: string;
  strokeLinecap?: "butt" | "round" | "square" | "inherit";
  strokeLinejoin?: "miter" | "round" | "bevel" | "inherit";
  strokeWidth?: string;
  d?: string; // Для Path елемента
  children?: ReactNode;
}

const Path: FC<SVGProps> = (props) => <path {...props} />;
const Svg: FC<SVGProps> = (props) => <svg {...props} />;

// =================================================================
// 3. КОНСТАНТИ ТА ТИПИ
// =================================================================

const Colors = {
  terracotta: "#E67D56",
  terracottaDark: "#D86047",
  navigationActive: "#E67D56",
  navigationInactive: "#A0A0A0",
  white: "#FFFFFF",
  black: "#000000",
};

interface IDish {
  title: string;
  restaurant: string;
  location: string;
  distance: string;
  rating1: number;
  rating2: number;
  price: number;
  currency: string;
  imageUrl: string;
}

const DishData: IDish = {
  title: "Herbed Golden Potatoes",
  restaurant: "Love Restaurant",
  location: "Dubai",
  distance: "3 miles away",
  rating1: 5.0,
  rating2: 4.8,
  price: 45,
  currency: "AED",
  imageUrl:
    "https://placehold.co/420x680/e67d56/e67d56?text=Herbed+Golden+Potatoes",
};

// =================================================================
// 4. ДОПОМІЖНІ КОМПОНЕНТИ (ІКОНКИ ТА NAV-ITEM)
// =================================================================

interface IconProps {
  color?: string;
}

const BackIcon: FC<IconProps> = ({ color = Colors.white }) => (
  <Svg
    className="w-6 h-6"
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      d="M15 19l-7-7 7-7"
    ></Path>
  </Svg>
);
const BellIcon: FC<IconProps> = ({ color = Colors.white }) => (
  <Svg
    className="w-6 h-6"
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    ></Path>
  </Svg>
);
const SendIcon: FC<IconProps> = ({ color = Colors.white }) => (
  <Svg
    className="w-6 h-6"
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
    ></Path>
  </Svg>
);
const SaveIcon: FC<IconProps> = ({ color = Colors.white }) => (
  <Svg
    className="w-6 h-6"
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
    ></Path>
  </Svg>
);

interface INavItemProps {
  icon: string;
  label: string;
  isActive: boolean;
}
const NavItem: FC<INavItemProps> = ({ icon, label, isActive }) => (
  <Pressable
    className="flex flex-col items-center justify-center p-1"
    style={{
      color: isActive ? Colors.navigationActive : Colors.navigationInactive,
    }}
  >
    <Text className="text-2xl">{icon}</Text>
    <Text className="text-xs font-semibold">{label}</Text>
  </Pressable>
);

// =================================================================
// 5. ОСНОВНИЙ КОМПОНЕНТ СТОРІНКИ (FoodDetailPage)
// =================================================================

const FoodDetailPage: FC = () => {
  const {
    title,
    restaurant,
    location,
    distance,
    rating1,
    rating2,
    price,
    currency,
    imageUrl,
  } = DishData;

  const styles = useMemo(
    () => ({
      // Імітація BlurView (RN)
      blurBg: {
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
      },
      // Градієнти (LinearGradient RN)
      viewDishGradient: {
        background: `linear-gradient(180deg, #9C3E30 0%, ${Colors.terracottaDark} 100%)`,
        boxShadow: `0 4px 10px rgba(216, 96, 71, 0.5)`,
      },
      orderNowGradient: {
        background: `linear-gradient(180deg, #ED7D52 0%, ${Colors.terracotta} 100%)`,
        boxShadow: `0 4px 10px rgba(230, 125, 86, 0.5)`,
      },
      // Тінь для тексту (TextShadow RN)
      textShadow: {
        textShadow: "0 1px 3px rgba(0, 0, 0, 0.6)",
      },
    }),
    []
  );

  return (
    <View className="flex flex-col h-full bg-white">
      {/* 1. Область зображення та головного контенту (flex: 1) */}
      <View className="relative flex-1">
        {/* Фонове зображення (Image component) */}
        <Image
          source={{ uri: imageUrl }}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Темний градієнт-оверлей знизу */}
        <View className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></View>

        {/* Хедер (Top Bar) */}
        <View className="absolute top-0 inset-x-0 flex justify-between items-center p-5 z-20">
          {/* Кнопка Назад (Pressable) */}
          <Pressable
            className="w-10 h-10 rounded-full flex items-center justify-center transition duration-150 active:scale-95"
            style={styles.blurBg}
            onClick={() => console.log("Back button pressed")}
          >
            <BackIcon />
          </Pressable>
          {/* Кнопка Сповіщення (Pressable) */}
          <Pressable
            className="w-10 h-10 rounded-full flex items-center justify-center transition duration-150 active:scale-95"
            style={styles.blurBg}
            onClick={() => console.log("Bell button pressed")}
          >
            <BellIcon />
          </Pressable>
        </View>

        {/* Бічні кнопки */}
        <View className="absolute top-1/2 right-6 flex flex-col space-y-4 transform -translate-y-1/2 z-20">
          {/* Кнопка Share */}
          <Pressable
            className="w-12 h-12 rounded-full flex flex-col items-center justify-center transition duration-150 active:scale-95"
            style={styles.blurBg}
            onClick={() => console.log("Share button pressed")}
          >
            <SendIcon />
            <Text
              className="text-xs font-semibold text-white mt-1"
              style={styles.textShadow}
            >
              Share
            </Text>
          </Pressable>
          {/* Кнопка Save */}
          <Pressable
            className="w-12 h-12 rounded-full flex flex-col items-center justify-center transition duration-150 active:scale-95"
            style={styles.blurBg}
            onClick={() => console.log("Save button pressed")}
          >
            <SaveIcon />
            <Text
              className="text-xs font-semibold text-white mt-1"
              style={styles.textShadow}
            >
              Save
            </Text>
          </Pressable>
        </View>

        {/* Контент внизу зображення */}
        <View className="absolute bottom-0 inset-x-0 p-6 text-white z-10">
          {/* Назва страви */}
          <Text
            className="text-3xl font-extrabold mb-8"
            style={styles.textShadow}
          >
            {title}
          </Text>

          {/* Інформація про ресторан */}
          <View className="flex items-center space-x-4 mb-4">
            <Text className="text-xl font-bold" style={styles.textShadow}>
              {restaurant}
            </Text>
            <View className="flex items-center text-sm font-semibold px-3 py-1 rounded-full bg-black/40">
              <Text className="text-sm" style={styles.textShadow}>
                {distance}
              </Text>
            </View>
          </View>

          {/* Рейтинги та локація */}
          <View className="flex space-x-3 mb-6">
            <View
              className="flex items-center px-3 py-1 bg-black/40 rounded-full text-sm font-medium"
              style={styles.textShadow}
            >
              <Text className="text-lg mr-1">⭐</Text>
              <Text>{rating1} Rating</Text>
            </View>
            <View
              className="flex items-center px-3 py-1 bg-black/40 rounded-full text-sm font-medium"
              style={styles.textShadow}
            >
              <Text className="text-lg mr-1">⭐</Text>
              <Text>{rating2} Rating</Text>
            </View>
            <View
              className="flex items-center px-3 py-1 bg-black/40 rounded-full text-sm font-medium"
              style={styles.textShadow}
            >
              <Text className="text-lg mr-1">📍</Text>
              <Text>{location}</Text>
            </View>
          </View>

          {/* Кнопки дій */}
          <View className="flex space-x-3 mb-4">
            {/* View Dish Button (Pressable) */}
            <Pressable
              className="flex-1 py-4 rounded-xl text-white text-lg font-bold transition duration-300 active:scale-95 flex justify-center items-center"
              style={styles.viewDishGradient}
              onClick={() => console.log("View Dish pressed")}
            >
              <Text>View Dish</Text>
            </Pressable>
            {/* Order Now Button (Pressable) */}
            <Pressable
              className="flex-1 py-4 rounded-xl text-white text-lg font-bold transition duration-300 active:scale-95 flex justify-center items-center"
              style={styles.orderNowGradient}
              onClick={() => console.log("Order Now pressed")}
            >
              <Text>
                Order Now | {currency} {price}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* 2. Нижня навігаційна панель */}
      <View className="flex justify-around items-center border-t border-gray-100 bg-white py-3 shadow-lg z-20">
        <NavItem icon="🏠" label="Home" isActive={true} />
        <NavItem icon="🔍" label="Discovery" isActive={false} />
        <NavItem icon="💬" label="Chats" isActive={false} />
        <NavItem icon="🧑‍🤝‍🧑" label="My Friends" isActive={false} />
        <NavItem icon="👤" label="Profile" isActive={false} />
      </View>
    </View>
  );
};

// =================================================================
// 6. ГОЛОВНИЙ КОМПОНЕНТ APP
// =================================================================

export default function App() {
  return (
    <React.Fragment>
      {/* Головний контейнер, що імітує мобільний екран */}
      <View className="flex justify-center items-center min-h-screen p-4 sm:p-0 bg-gray-100">
        <View
          className="w-full max-w-md h-[90vh] shadow-2xl overflow-hidden rounded-3xl bg-white"
          style={{
            aspectRatio: "9 / 16",
            minHeight: "600px",
            maxHeight: "800px",
          }}
        >
          <FoodDetailPage />
        </View>
      </View>
    </React.Fragment>
  );
}
