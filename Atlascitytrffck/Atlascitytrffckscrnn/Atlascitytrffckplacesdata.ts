import {ImageSourcePropType} from 'react-native';

export type AtlasCityPlace = {
  title: string;
  coordinates: string;
  description: string;
  image: ImageSourcePropType;
};

export const atlasCityPlacesData: AtlasCityPlace[] = [
  {
    title: 'Tokyo, Japan',
    coordinates: '35.6762, 139.6503',
    image: require('../../assets/i/atlascitytplace1.png'),
    description:
      'Tokyo is often called one of the most organized megacities in the world, especially when it comes to traffic flows. The city with a population of over 30 million people has an extremely complex system of roads, overpasses and ring roads. Despite the huge number of cars, the traffic here looks surprisingly orderly. In the city center there are many narrow streets that were formed decades ago, so large cars are less common here than compact city models. Small cars of the kei car category, designed specifically for the dense urban environment, are especially popular. During rush hour, Tokyo turns into a complex system of flows, where each driver moves at his own pace, but the overall movement remains predictable. At large intersections you can see dozens of cars synchronously changing direction after a traffic light signal. An important part of urban transport here are also underground parking lots and multi-level roads, which allow the distribution of car flows between different levels of the city. Tokyo demonstrates an example of how a metropolis can combine intensive car traffic with a high level of organization. That is why this city is often considered one of the most interesting for observing modern urbanism and transport culture.',
  },
  {
    title: 'New York, USA',
    coordinates: '40.7128, -74.0060',
    image: require('../../assets/i/atlascitytplace2.png'),
    description:
      'New York is one of the most famous metropolises in the world, where traffic is an integral part of the urban atmosphere. The streets of Manhattan form the famous rectangular grid plan, thanks to which the city looks orderly even during peak hours. Cars, taxis, buses and service vehicles create a continuous flow that moves between skyscrapers and numerous intersections. A feature of New York is the huge number of yellow taxis, which have long become a symbol of the city. They constantly move along the main streets, picking up passengers and quickly changing direction. During rush hour, the speed of transport is often reduced to a minimum, but drivers are well accustomed to this rhythm and continue to move in a dense stream. Many drivers use navigation even for short trips, since traffic can change in just a few minutes. At some intersections, you can see dozens of cars simultaneously trying to occupy their lane. It is this constant dynamics that makes New York one of the most characteristic examples of a metropolis with intensive traffic.',
  },
  {
    title: 'London, UK',
    coordinates: '51.5074, -0.1278',
    image: require('../../assets/i/atlascitytplace3.png'),
    description:
      'London is known for its historic streets, which were formed long before the advent of cars. Because of this, the city transport system has a unique structure with narrow roads, roundabouts and complex routes. Many of the main streets pass between old buildings, which creates an atmosphere that is difficult to find in other metropolises. Traffic in London often seems slow but steady. Drivers drive on the left side of the road, which may be unusual for tourists, but locals have long been accustomed to this system. An important part of the city traffic are the famous black taxis and red buses, which transport thousands of people every day. Due to the high density of buildings in the city center, compact cars and hybrid models are popular. Many drivers try to avoid central areas during rush hour, as traffic speeds can drop significantly there. London shows how a historic city can adapt to modern transportation needs without losing its unique character.',
  },
  {
    title: 'Paris, France',
    coordinates: '48.8566, 2.3522',
    image: require('../../assets/i/atlascitytplace4.png'),
    description:
      'Paris is known for its wide boulevards, which were created in the 19th century during the city major reconstruction. It is thanks to these avenues that traffic in the French capital has a special rhythm. Streets often lead to large roundabouts, where dozens of cars can move at the same time. The most famous example of such an intersection is the Place Charles de Gaulle near the Arc de Triomphe. Twelve roads converge here, and drivers must carefully monitor the movement of other cars. Despite the complexity of such an intersection, the traffic flow continues to move almost without stopping. Small cars are popular in the center of Paris, as many streets remain quite narrow. You can also see many electric cars and compact city cars here. Paris combines historical architecture with modern transport, creating a unique atmosphere of a large European metropolis.',
  },
  {
    title: 'Los Angeles, USA',
    coordinates: '34.0522, -118.2437',
    image: require('../../assets/i/atlascitytplace5.png'),
    description:
      'Los Angeles is often called the city of cars. Unlike many other megacities, most residents here travel by their own transport. Because of this, the city has a huge network of highways that connect different areas with each other. Some roads have up to ten lanes of traffic in one direction, making them some of the largest in the world. Despite this, traffic jams can stretch for tens of kilometers during rush hour. Drivers spend a lot of time on the road, so cars are often equipped with modern comfort systems. Los Angeles shows another type of metropolis where the car has become the main mode of transportation. It is here that you can see a huge variety of vehicles, from compact cars to large SUVs.',
  },
  {
    title: 'Singapore - Marina Bay Traffic Circle',
    coordinates: '1.2834, 103.8607',
    image: require('../../assets/i/atlascitytplace6.png'),
    description:
      'Marina Bay in Singapore is one of the most famous transport areas of the city, where modern architecture is combined with intense traffic. Major urban highways pass through this place, connecting the financial center with residential areas and port areas. During rush hour, the flow of cars here can be very dense, but thanks to the precise organization of the road system, traffic remains smooth and predictable. Singapore is known for paying great attention to traffic management: many intersections are equipped with intelligent traffic lights that analyze the flow of cars and change the phases of the signals to optimize traffic. In the Marina Bay area, you can see both compact city cars and premium sedans used for business transportation. It is important for drivers to pay close attention to road signs, as there are many junctions and roundabouts. This area demonstrates how a modern metropolis can combine a large number of cars with a well-organized infrastructure.',
  },
  {
    title: 'Barcelona - Gran Via Junction',
    coordinates: '41.3853, 2.1734',
    image: require('../../assets/i/atlascitytplace7.png'),
    description:
      'Gran Via de les Corts Catalanes is one of the main transport arteries of Barcelona. This wide highway crosses a significant part of the city and receives a huge number of cars every day. You can see a variety of vehicles here, from small city hatchbacks to large SUVs and company cars. The peculiarity of traffic in Barcelona is that drivers have to adapt quickly to changes in the flow. During rush hour, cars move in an almost continuous flow, but thanks to the large number of lanes, the traffic does not stop for long. Gran Via intersections often have a complex structure, combining highways, bicycle paths, and pedestrian crossings. That is why drivers need to carefully control their speed and always pay attention to traffic signals. Barcelona is known for its active city life, and transportation here is an important part of the daily rhythm of the city.',
  },
  {
    title: 'Toronto - Gardiner Expressway',
    coordinates: '43.6396, -79.3957',
    image: require('../../assets/i/atlascitytplace8.png'),
    description:
      'Gardiner Expressway is one of Toronto key transportation arteries. This expressway runs along the waterfront of Lake Ontario and connects different parts of the city with the business center. Thousands of cars use this route every day to travel to work, business centers, and residential areas. During the morning and evening rush hours, traffic can be very dense here, and cars move with almost no gaps between them. Because of this, drivers must carefully control their distance and speed. The Gardiner Expressway has several major exits that lead to downtown Toronto, and these sections often experience the heaviest traffic. Despite the heavy traffic, this road remains an important part of the city transportation system and allows for quick movement between different areas of the metropolis.',
  },
  {
    title: 'Dubai - Sheikh Zayed Road',
    coordinates: '25.2048, 55.2708',
    image: require('../../assets/i/atlascitytplace9.png'),
    description:
      'Sheikh Zayed Road is the main transportation artery of Dubai and one of the most famous roads in the Middle East. It runs through the city business district and is surrounded by tall skyscrapers, hotels and shopping malls. This road has many lanes and is able to accommodate a huge number of cars. It is often seen driving expensive sedans, sports cars and large SUVs. Traffic on Sheikh Zayed Road can be very fast, but drivers should carefully follow signs and speed limits. The road is equipped with modern control systems, including cameras and automatic traffic monitoring systems. This allows traffic to flow smoothly, even when thousands of cars are on the road at the same time.',
  },
  {
    title: 'Chicago - Michigan Avenue Loop',
    coordinates: '41.8917, -87.6243',
    image: require('../../assets/i/atlascitytplace10.png'),
    description:
      'Michigan Avenue in Chicago is one of the most famous urban roads in the United States. It runs through the city center and connects business districts with shopping areas and the Lake Michigan waterfront. During rush hour, traffic can be very heavy, and drivers should be prepared for frequent stops and starts. The peculiarity of this road is that it runs through a densely built-up part of the city, where there are many pedestrians and public transportation. Because of this, the traffic flow sometimes moves slower than on expressways. However, Michigan Avenue remains an important transport corridor that thousands of people use every day. For drivers, the main rule here is attentiveness and patience, because in a big city the rhythm of traffic is often dictated by the density of traffic.',
  },
];
