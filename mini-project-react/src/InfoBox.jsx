import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./InfoBox.css"
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';


export default function InfoBox({ info }) {
    const HOT_URL = "https://images.unsplash.com/photo-1504370805625-d32c54b16100?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90JTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D";
    const RAIN_URL = "https://media.istockphoto.com/id/1476190237/photo/summer-rain-raindrops-bad-weather-depression.webp?a=1&b=1&s=612x612&w=0&k=20&c=AqmeafeXtSEbnuq1mxdDr9nSrXunta3huhlXpLRMnes=";
    const SNOW_URL = "https://images.unsplash.com/photo-1641732423736-2c9ebb3e8338?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGNvbGQlMjB3ZWF0aGVyfGVufDB8fDB8fHww";
    const DARK_CLOUD_URL = "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNsb3VkfGVufDB8fDB8fHww";
    const CLOUD_URL = "https://images.unsplash.com/photo-1597571063304-81f081944ee8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNsb3VkfGVufDB8fDB8fHww";
    const COLD_URL = "https://images.unsplash.com/photo-1564314968303-86c5df2b9a4c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29sZCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";

    function getWeatherVisuals(weather) {
        const condition = weather.toLowerCase();

        if (condition.includes("rain")) {
            return { icon: <ThunderstormIcon />, image: RAIN_URL };
        } else if (condition.includes("clear")) {
            if (info.temp < 10) {
                return { icon: <AcUnitIcon />, image: COLD_URL }; // cold clear weather
            }
            return { icon: <WbSunnyIcon />, image: HOT_URL };
        } else if (condition.includes("cloud")) {
            if (condition.includes("overcast") || info.humidity > 85) {
                return { icon: <ThunderstormIcon />, image: DARK_CLOUD_URL }; // rainy-looking clouds
            } else if (info.temp < 10) {
                return { icon: <AcUnitIcon />, image: COLD_URL }; // cold and cloudy
            } else {
                return { icon: <WbSunnyIcon />, image: CLOUD_URL }; // normal clouds
            }
        } else if (condition.includes("snow")) {
            return { icon: <AcUnitIcon />, image: SNOW_URL }; // snowy condition
        } else if (info.temp < 10) {
            return { icon: <AcUnitIcon />, image: COLD_URL }; // cold but uncategorized condition
        } else {
            return { icon: <WbSunnyIcon />, image: HOT_URL }; // fallback
        }

    }

    const { icon, image } = getWeatherVisuals(info.weather);

    return (
        <div className="InfoBox">
            <div className='cardContainer'>
                <Card sx={{ maxWidth: 440, borderRadius: 4, boxShadow: 3 }}>
                    <CardMedia
                        sx={{ height: 240 }}
                        image={image}
                        title="Weather Image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {info.city.charAt(0).toUpperCase() + info.city.slice(1)} {icon}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
                            <p>Temperature = {info.temp}&deg;C</p>
                            <p>Humidity = {info.humidity}</p>
                            <p>Min Temp = {info.tempMin}&deg;C</p>
                            <p>Max Temp = {info.tempMax}&deg;C</p>
                            <p>The weather can be described as <i>{info.weather}</i> and feels like {info.feelsLike}&deg;C</p>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}