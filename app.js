
import express from "express";
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));


const uri = 'mongodb://127.0.0.1:27017/culturalFactsDB';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Mongoose connected to ' + uri);
});

db.on('error', error => {
    console.error('Mongoose connection error:', error);
});

db.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

//Create and add cultural facts to the DB
const culturalFactsToAdd = [
    { culturalFact: 'In Japan, it is considered polite to slurp your noodles while eating.', country: 'Japan' },
    { culturalFact: 'India is known for its diverse range of spices used in cooking, creating a rich and flavorful cuisine.', country: 'India' },
    { culturalFact: 'The Eiffel Tower in Paris, France, was originally built as a temporary structure for the 1889 World\'s Fair.', country: 'France' },
    { culturalFact: 'In Mexico, the Day of the Dead (Día de los Muertos) is a festive holiday that honors and celebrates deceased loved ones.', country: 'Mexico' },
    { culturalFact: 'China is famous for its ancient and intricate art of paper folding, known as origami.', country: 'China' },
    { culturalFact: 'The Great Barrier Reef in Australia is the world\'s largest coral reef system and is home to a diverse range of marine life.', country: 'Australia' },
    { culturalFact: 'Russia spans 11 time zones, making it the largest country in terms of land area.', country: 'Russia' },
    { culturalFact: 'Brazil is known for its vibrant and energetic Carnaval celebration, featuring colorful parades, music, and dancing.', country: 'Brazil' },
    { culturalFact: 'In Egypt, the pyramids were built as tombs for pharaohs and are some of the most iconic ancient structures in the world.', country: 'Egypt' },
    { culturalFact: 'Italy is renowned for its rich history of art, with contributions to painting, sculpture, architecture, and more.', country: 'Italy' },
    { culturalFact: 'Greece is often referred to as the cradle of Western civilization due to its historical significance and contributions to philosophy, democracy, and literature.', country: 'Greece' },
    { culturalFact: 'In Japan, it is customary to remove your shoes before entering someone\'s home to show respect.', country: 'Japan' },
    { culturalFact: 'Italy is famous for its delicious cuisine, including pasta, pizza, and gelato.', country: 'Italy' },
    { culturalFact: 'In South Korea, the number four is considered unlucky as it sounds similar to the word for death.', country: 'South Korea' },
    { culturalFact: 'Russia is known for its traditional nesting dolls, called Matryoshka dolls, which often feature intricate designs.', country: 'Russia' },
    { culturalFact: 'Mexico is the birthplace of chocolate, and ancient civilizations like the Maya and Aztecs first cultivated cacao plants.', country: 'Mexico' },
    { culturalFact: 'In Egypt, the River Nile has played a crucial role in the country\'s history, providing fertile soil for agriculture and transportation.', country: 'Egypt' },
    { culturalFact: 'Argentina is famous for the tango dance, a passionate and expressive dance style that originated in the streets of Buenos Aires.', country: 'Argentina' },
    { culturalFact: 'India is home to a variety of traditional music instruments, including the sitar, tabla, and bansuri.', country: 'India' },
    { culturalFact: 'In Kenya, the Maasai tribe is known for their distinctive red clothing, intricate beadwork, and vibrant culture.', country: 'Kenya' },
    { culturalFact: 'China\'s Great Wall is one of the most iconic architectural wonders, spanning over 13,000 miles and built to protect against invasions.', country: 'China' },
    { culturalFact: 'Greece is famous for its ancient mythology, with gods and goddesses like Zeus, Athena, and Poseidon influencing its culture and stories.', country: 'Greece' },
    { culturalFact: 'In Canada, the First Nations people have a rich cultural heritage, including unique art, storytelling, and spiritual practices.', country: 'Canada' },
    { culturalFact: 'Brazil hosts the world\'s largest Carnival celebration, featuring samba parades, music, and elaborate costumes.', country: 'Brazil' },
    { culturalFact: 'The United Kingdom is known for its royal traditions, historic castles, and the changing of the guard at Buckingham Palace.', country: 'United Kingdom' },
    { culturalFact: 'In Sweden, the concept of "lagom" encourages balance and moderation in all aspects of life.', country: 'Sweden' },
    { culturalFact: 'Australia is home to diverse Indigenous cultures, with each Aboriginal group having its own unique language, art, and traditions.', country: 'Australia' },
    { culturalFact: 'In Thailand, the traditional greeting called "wai" involves pressing your palms together in a prayer-like gesture as a sign of respect.', country: 'Thailand' },
    { culturalFact: 'The Netherlands is famous for its tulip fields, windmills, and cycling culture.', country: 'Netherlands' },
    { culturalFact: 'South Africa\'s diverse culture is reflected in its 11 official languages and vibrant celebrations like the Cape Town Carnival.', country: 'South Africa' },
    { culturalFact: 'Japan\'s cherry blossom season, known as "hanami," is a time to appreciate the beauty of sakura flowers and gather for picnics under the blossoms.', country: 'Japan' },
    { culturalFact: 'In Nepal, the Namaste gesture is a common form of greeting, made by pressing the palms together at the chest and bowing.', country: 'Nepal' },
    { culturalFact: 'In Saudi Arabia, dates hold cultural significance and are often served to guests as a symbol of hospitality.', country: 'Saudi Arabia' },
    { culturalFact: 'Canada\'s multiculturalism is celebrated through the mosaic concept, where diverse cultures coexist while retaining their uniqueness.', country: 'Canada' },
    { culturalFact: 'Indonesia is known for its rich batik tradition, a method of dyeing cloth using wax to create intricate patterns.', country: 'Indonesia' },
    { culturalFact: 'The traditional tea ceremony in China focuses on mindfulness, harmony, and respect during the process of preparing and serving tea.', country: 'China' },
    { culturalFact: 'In Nigeria, the Yoruba people celebrate the Osun-Osogbo festival to honor the river goddess Osun, featuring processions and rituals.', country: 'Nigeria' },
    { culturalFact: 'Iran is famous for its stunning architecture, including intricate tilework and domed structures like the Sheikh Lotfollah Mosque.', country: 'Iran' },
    { culturalFact: 'The Holi festival in India is a vibrant celebration of colors, symbolizing the victory of good over evil and the arrival of spring.', country: 'India' },
    { culturalFact: 'In Norway, the concept of "friluftsliv" emphasizes the connection to nature and outdoor activities as a source of well-being.', country: 'Norway' },
    { culturalFact: 'The Maori people of New Zealand have a strong cultural heritage that includes the haka, a traditional war dance expressing strength and unity.', country: 'New Zealand' },
    { culturalFact: 'Morocco\'s medinas (historic city centers) are known for their labyrinthine streets, vibrant markets, and stunning architecture.', country: 'Morocco' },
    { culturalFact: 'Vietnam has a rich tradition of water puppetry, where performances take place on water and depict scenes from daily life and folklore.', country: 'Vietnam' },
    { culturalFact: 'In Peru, the ancient city of Machu Picchu is a UNESCO World Heritage Site and a testament to the Inca civilization\'s architectural ingenuity.', country: 'Peru' },
    { culturalFact: 'Spain is famous for its lively flamenco music and dance, characterized by passionate rhythms and intricate footwork.', country: 'Spain' },
    { culturalFact: 'The Masai Mara National Reserve in Kenya is home to the Great Migration, where millions of wildebeests and other animals cross the savannah.', country: 'Kenya' },
    { culturalFact: 'The Aboriginal Dreamtime stories of Australia hold the beliefs, traditions, and creation stories of Indigenous peoples.', country: 'Australia' },
    { culturalFact: 'Ghana is known for its Kente cloth, woven with intricate patterns and vibrant colors that convey cultural and historical significance.', country: 'Ghana' },
    { culturalFact: 'Traditional Irish music, often played in pubs, features instruments like the fiddle, bodhrán, and uilleann pipes.', country: 'Ireland' },
    { culturalFact: 'In Bhutan, the concept of Gross National Happiness prioritizes well-being, spiritual values, and cultural preservation over economic growth.', country: 'Bhutan' },
    { culturalFact: 'The Ainu people of Japan have a distinct culture, including their language, clothing, and unique tattooing traditions.', country: 'Japan' },
    { culturalFact: 'In Iceland, the tradition of "Jólabókaflóð" involves giving books as gifts on Christmas Eve and spending the night reading.', country: 'Iceland' },
    { culturalFact: 'In Papua New Guinea, different tribes create intricate body art using natural pigments, leaves, and shells to express identity and culture.', country: 'Papua New Guinea' },
    { culturalFact: 'The Oud, a stringed instrument with a deep and rich sound, is often associated with traditional music in countries like Iraq and Turkey.', country: 'Iraq' },
    { culturalFact: 'In Chile, the ancient moai statues on Easter Island are a testament to the creativity and craftsmanship of the Rapa Nui people.', country: 'Chile' },
    { culturalFact: 'Ethiopia follows a unique calendar system with 13 months, including 12 months of 30 days and one month of 5 or 6 days.', country: 'Ethiopia' },
    { culturalFact: 'The traditional dance of Samba de Roda in Brazil is characterized by its circular formation, drums, and energetic movements.', country: 'Brazil' },
    { culturalFact: 'In Thailand, monks participate in the daily ritual of alms-giving, receiving food and offerings from the community as an act of merit.', country: 'Thailand' },
    { culturalFact: 'Mongolia\'s nomadic culture is exemplified by the Ger (yurt), a portable dwelling that provides shelter in the vast steppes.', country: 'Mongolia' },
    { culturalFact: 'The art of "Ikebana" in Japan involves arranging flowers in a harmonious and minimalistic way, reflecting aesthetic principles.', country: 'Japan' },
    { culturalFact: 'In Nigeria, the Dufuna Canoe is believed to be one of the oldest watercraft in Africa, dating back around 8,000 years.', country: 'Nigeria' },
    { culturalFact: 'The traditional Maori facial tattoo known as "moko" is a sacred and cultural form of self-expression in New Zealand.', country: 'New Zealand' },
    { culturalFact: 'In Romania, "Martisor" is a spring tradition where people wear red and white threads to symbolize the arrival of warmer days.', country: 'Romania' },
    { culturalFact: 'In Bhutan, the government measures progress through a Gross National Happiness index, focusing on well-being and quality of life.', country: 'Bhutan' },
    { culturalFact: 'The intricate designs of Persian rugs from Iran are not only visually appealing but also tell stories and cultural symbolism.', country: 'Iran' },
    { culturalFact: 'The Haida people of Canada\'s Pacific Northwest are known for their intricate totem poles, which convey stories and heritage.', country: 'Canada' },
    { culturalFact: 'In Nigeria, the "Eyo" festival involves colorful processions and masquerades to commemorate significant events and celebrate culture.', country: 'Nigeria' },
    { culturalFact: 'The Holi festival in Nepal also involves the celebration of colors, emphasizing unity and the sharing of joy among communities.', country: 'Nepal' },
    { culturalFact: 'Bulgaria\'s traditional "Surva" festival includes masked performances and rituals to drive away evil spirits and bring good fortune.', country: 'Bulgaria' },
    { culturalFact: 'In Morocco, the medina of Fes is one of the world\'s oldest continuously inhabited cities, with its labyrinthine alleys and history.', country: 'Morocco' },
    { culturalFact: 'In Finland, "Kalsarikänni" is a term that translates to "drinking at home in your underwear," emphasizing comfort and relaxation.', country: 'Finland' },
    { culturalFact: 'In Greece, breaking plates during celebrations is a traditional practice symbolizing joy and good fortune.', country: 'Greece' },
    { culturalFact: 'In Mongolia, the "Three Manly Games" include wrestling, horse racing, and archery, showcasing traditional skills and strength.', country: 'Mongolia' },
    { culturalFact: 'In the Maasai culture of Kenya, intricate beadwork on clothing and jewelry carries deep cultural meanings and signifies identity.', country: 'Kenya' },
    { culturalFact: 'In Iran, the "Nowruz" celebration marks the Persian New Year and involves cleaning, feasting, and visiting family and friends.', country: 'Iran' },
    { culturalFact: 'In Egypt, the "Felucca" is a traditional wooden sailing boat used for transportation along the Nile River.', country: 'Egypt' },
    { culturalFact: 'The Sami people of northern Scandinavia practice "yoiking," a form of vocalization used to communicate with nature and express emotions.', country: 'Scandinavia' },
    { culturalFact: 'In Ethiopia, the "Dance of the Warriors" is a traditional performance that imitates martial arts movements.', country: 'Ethiopia' },
    { culturalFact: 'In Madagascar, the "Turning of the Bones" ritual involves exhuming deceased relatives, rewrapping their remains, and celebrating their memory.', country: 'Madagascar' },
    { culturalFact: 'The "Art of Living" in India promotes holistic well-being through yoga, meditation, and a balanced lifestyle.', country: 'India' },
    { culturalFact: 'In Spain, the "Running of the Bulls" during the San Fermín festival involves participants running in front of charging bulls.', country: 'Spain' },
    { culturalFact: 'The indigenous Ainu people of Japan have a unique and complex tattooing tradition that signifies social status and personal identity.', country: 'Japan' },
    { culturalFact: 'In Ethiopia, the ancient city of Axum is said to house the Ark of the Covenant, a revered religious artifact.', country: 'Ethiopia' },
    { culturalFact: 'The "Whirling Dervishes" of Turkey perform a mesmerizing dance called the "Sema," symbolizing a spiritual journey and connection with God.', country: 'Turkey' },
    { culturalFact: 'In Colombia, the "Carnival of Blacks and Whites" celebrates African and indigenous heritage through colorful parades and art.', country: 'Colombia' },
    { culturalFact: 'The traditional "Lakalaka" dance in Tonga is a form of storytelling, often performed during important ceremonies and events.', country: 'Tonga' },
    { culturalFact: 'In Bolivia, the salt flats of Uyuni create an otherworldly landscape that is used to reflect the sky and create stunning optical illusions.', country: 'Bolivia' },
    { culturalFact: 'The "Tezhip" art form in Turkey involves intricate illumination of manuscripts and documents with delicate patterns and motifs.', country: 'Turkey' },
    { culturalFact: 'In Bhutan, "Driglam Namzha" is a code of etiquette that governs behavior and interactions, emphasizing respect and cultural norms.', country: 'Bhutan' },
    { culturalFact: 'The Maori haka dance in New Zealand is performed to assert strength, unity, and cultural identity, often before sports events.', country: 'New Zealand' },
    { culturalFact: 'In Finland, "Sisu" is a cultural concept that represents resilience, determination, and the ability to overcome challenges.', country: 'Finland' },
    { culturalFact: 'In Vietnam, "Cai Luong" is a traditional form of theater combining singing, acting, and dancing, often accompanied by a live orchestra.', country: 'Vietnam' },
  { culturalFact: 'In Norway, "Lutefisk" is a traditional dish made from dried fish and lye, often enjoyed during the holiday season.', country: 'Norway' },
  { culturalFact: 'The "Kecak" dance in Bali, Indonesia, involves a large group of performers chanting in a rhythmic manner while telling a story.', country: 'Indonesia' },
  { culturalFact: 'In Venezuela, the "Catatumbo Lightning" is a natural phenomenon where lightning occurs almost every night over Lake Maracaibo.', country: 'Venezuela' },
  { culturalFact: 'The indigenous people of Canada, known as First Nations, have diverse cultures and languages that vary across different regions.', country: 'Canada' },
  { culturalFact: 'In Egypt, the "Koshary" dish is a hearty combination of rice, lentils, pasta, and chickpeas, topped with flavorful sauces.', country: 'Egypt' },
  { culturalFact: 'In South Korea, "Hanbok" is the traditional clothing worn during special occasions and celebrations, known for its vibrant colors.', country: 'South Korea' },
  { culturalFact: 'The "Maneki Neko" figurine in Japan, often called the "beckoning cat," is believed to bring good luck and fortune to its owner.', country: 'Japan' },
  { culturalFact: 'In Iceland, "Huldufólk" refers to hidden people or elves believed to live in the rocks and mountains, a part of folklore.', country: 'Iceland' },
  { culturalFact: 'The ancient city of Petra in Jordan is known for its rock-cut architecture and the iconic "Treasury" carved into the sandstone.', country: 'Jordan' },
  { culturalFact: 'In Poland, "Wigilia" is a traditional Christmas Eve meal that begins with the appearance of the first star in the sky.', country: 'Poland' },
  { culturalFact: 'The "Chinchorro mummies" in Chile are among the oldest intentionally prepared mummies, dating back around 5,000 to 7,000 years.', country: 'Chile' },
  { culturalFact: 'In Kenya, "Maasai Mara" is a renowned wildlife reserve known for the Great Migration of wildebeests and other animals.', country: 'Kenya' },
  { culturalFact: 'The "Bardo Museum" in Tunisia houses an impressive collection of Roman mosaics, sculptures, and artifacts.', country: 'Tunisia' },
  { culturalFact: 'In Papua New Guinea, "Bilas" refers to traditional body decorations, often consisting of paint, feathers, shells, and jewelry.', country: 'Papua New Guinea' },
  { culturalFact: 'In South Africa, "Ubuntu" is a philosophy emphasizing compassion, unity, and the interconnectedness of humanity.', country: 'South Africa' },
  { culturalFact: 'The "Tanabata" festival in Japan celebrates the meeting of two star-crossed lovers, represented by the stars Vega and Altair.', country: 'Japan' },
  { culturalFact: 'In Morocco, "Mint Tea" is a traditional beverage often served to guests as a sign of hospitality and friendship.', country: 'Morocco' },
  { culturalFact: 'The ancient city of Timbuktu in Mali was once a hub of scholarship, trade, and Islamic culture in the African Sahara.', country: 'Mali' },
  { culturalFact: 'In Australia, "Dreamtime" stories are central to Aboriginal culture, explaining the creation of the world and spiritual connections.', country: 'Australia' },
  { culturalFact: 'In Bhutan, "Phallus art" is a traditional form of folk art believed to ward off evil spirits and bring fertility and prosperity.', country: 'Bhutan' },
  { culturalFact: 'The "Mid-Autumn Festival" in China is celebrated by families coming together to enjoy mooncakes and admire the full moon.', country: 'China' },
  { culturalFact: 'In Italy, "Carnevale" is a lively and colorful carnival celebration before Lent, featuring masquerades, parades, and festivities.', country: 'Italy' },
  { culturalFact: 'The "Didgeridoo" instrument in Australia is made from eucalyptus wood and produces a distinct deep sound used in Aboriginal music.', country: 'Australia' },
  { culturalFact: 'In Mexico, the "Dia de los Muertos" (Day of the Dead) is a vibrant celebration that honors deceased loved ones with altars, marigolds, and sugar skulls.', country: 'Mexico' },
  { culturalFact: 'The "Blue Mosque" in Turkey, also known as Sultan Ahmed Mosque, is an iconic symbol of Istanbul with its stunning blue tiles and grand architecture.', country: 'Turkey' },
  { culturalFact: 'In Zimbabwe, the "Great Zimbabwe" ruins are a testament to the rich history of the Kingdom of Zimbabwe and its impressive stone structures.', country: 'Zimbabwe' },
  { culturalFact: 'The "Pachamanca" dish in Peru involves cooking meat, potatoes, and vegetables underground using hot stones, preserving flavors and traditions.', country: 'Peru' },
  { culturalFact: 'In Mongolia, "Gers" are traditional round tents used by nomads, offering portability and protection in the vast steppes.', country: 'Mongolia' },
  { culturalFact: 'The "Paro Taktsang" monastery in Bhutan, also known as the "Tiger\'s Nest," clings to a cliffside and offers breathtaking views.', country: 'Bhutan' },
  { culturalFact: 'In Argentina, "Mate" is a traditional herbal drink shared among friends and family, fostering social connections and cultural rituals.', country: 'Argentina' },
  { culturalFact: 'The "Dayak" people of Borneo practice intricate body tattooing, using symbolic designs that represent personal achievements and spiritual beliefs.', country: 'Borneo' },
  { culturalFact: 'In Saudi Arabia, "Janadriyah" is an annual cultural festival that showcases traditional music, dance, crafts, and heritage.', country: 'Saudi Arabia' },
  { culturalFact: 'The "Awa Odori" dance in Japan is performed during the Obon festival, characterized by its lively steps and lantern-lit processions.', country: 'Japan' },
  { culturalFact: 'In Morocco, the "Fez" is a traditional hat known for its distinctive design and cultural significance.', country: 'Morocco' },
  { culturalFact: 'The "Cao Dai" religion in Vietnam is a unique blend of different spiritual beliefs, including Buddhism, Christianity, and Confucianism.', country: 'Vietnam' },
  { culturalFact: 'In Kenya, the Maasai people wear brightly colored "Shuka" cloth draped over their bodies as part of their cultural attire.', country: 'Kenya' },
  { culturalFact: 'The "Gion Matsuri" festival in Kyoto, Japan, is one of the country\'s most famous festivals, featuring elaborate processions and floats.', country: 'Japan' },
  { culturalFact: 'In Norway, "Koldtbord" is a traditional buffet-style meal featuring a variety of cold dishes, often served during festive occasions.', country: 'Norway' },
  { culturalFact: 'The "Chavin de Huantar" archaeological site in Peru is known for its complex underground galleries and unique stone carvings.', country: 'Peru' },
  { culturalFact: 'In Finland, "Sisu" refers to a unique sense of determination and resilience that drives individuals to overcome challenges.', country: 'Finland' },
  { culturalFact: 'The "Yamaboko Junko" festival in Kyoto, Japan, features massive wooden floats adorned with intricate tapestries and carvings.', country: 'Japan' },
  { culturalFact: 'In Ireland, the "Cliffs of Moher" offer breathtaking coastal views and are a popular destination for tourists and locals alike.', country: 'Ireland' },
  { culturalFact: 'The "Sari" is a traditional garment worn by women in India, featuring intricate draping techniques and various fabrics.', country: 'India' },
  { culturalFact: 'In Tanzania, the "Serengeti National Park" is renowned for the annual wildebeest migration, one of nature\'s most awe-inspiring events.', country: 'Tanzania' },
  { culturalFact: 'The "Semana Santa" (Holy Week) in Spain features elaborate processions, religious observances, and artistic displays across the country.', country: 'Spain' },
  { culturalFact: 'In Indonesia, the "Rijsttafel" is a Dutch-influenced meal featuring an array of small dishes showcasing diverse flavors and ingredients.', country: 'Indonesia' },
  { culturalFact: 'The "Gamelan" ensemble in Indonesia consists of traditional musical instruments and is an integral part of Javanese and Balinese culture.', country: 'Indonesia' },
  { culturalFact: 'In Ethiopia, the ancient city of Lalibela is famous for its rock-hewn churches, a UNESCO World Heritage Site.', country: 'Ethiopia' },
  { culturalFact: 'The "Tarantella" dance in Italy is known for its lively and rapid footwork, often performed during festive celebrations.', country: 'Italy' },
  { culturalFact: 'In Bhutan, the "Zhungdra" genre of traditional music features melodious songs accompanied by traditional instruments.', country: 'Bhutan' },
  { culturalFact: 'The "Reindeer Herding" tradition among the indigenous Sámi people of northern Scandinavia is a vital part of their culture and livelihood.', country: 'Scandinavia' },
  { culturalFact: 'In Jamaica, the "Jerk" cooking style involves marinating meat in a spicy mixture and cooking it over an open flame.', country: 'Jamaica' },
  { culturalFact: 'The "Temples of Bagan" in Myanmar showcase over 2,000 ancient temples and stupas, offering a glimpse into the country\'s rich history.', country: 'Myanmar' },
  { culturalFact: 'In Mali, the "Djenné-Djenno" archaeological site reveals the remains of one of the oldest known cities in sub-Saharan Africa.', country: 'Mali' },
  { culturalFact: 'The "Kākāpō" in New Zealand is a critically endangered flightless parrot and the heaviest parrot species in the world.', country: 'New Zealand' },
  { culturalFact: 'In Colombia, the "Carnival of Barranquilla" is one of the largest carnival celebrations in the world, featuring vibrant costumes and parades.', country: 'Colombia' },
  { culturalFact: 'The "Saqqara" complex in Egypt includes the Step Pyramid, one of the earliest colossal stone structures and a precursor to the pyramids.', country: 'Egypt' },
  { culturalFact: 'In Bhutan, the "Takin" is a unique-looking national animal that resembles a mix between a goat and a cow.', country: 'Bhutan' },
  { culturalFact: 'The "Carne de Sol" dish in Brazil involves curing and drying salted beef, resulting in a flavorful and tender meat.', country: 'Brazil' },
  { culturalFact: 'In Nigeria, the "Nok Terracottas" are ancient sculptures that represent one of the earliest forms of artistic expression in West Africa.', country: 'Nigeria' },
  { culturalFact: 'The "Camino de Santiago" in Spain is a network of pilgrimage routes leading to the shrine of Saint James in Santiago de Compostela.', country: 'Spain' },
  { culturalFact: 'In Bhutan, the "Drukgyal Dzong" was a fortress and monastery built to commemorate Bhutanese victory over Tibetan invaders.', country: 'Bhutan' },
  { culturalFact: 'The "Tango" dance originated in the working-class neighborhoods of Buenos Aires, Argentina, and has since become a global phenomenon.', country: 'Argentina' },
  { culturalFact: 'In South Korea, "Hanji" is traditional paper made from mulberry bark, valued for its strength and versatility in artistic creations.', country: 'South Korea' },
  { culturalFact: 'The "Andean Condor" is a majestic bird native to the Andes mountains of South America and holds cultural significance for indigenous peoples.', country: 'South America' },
  { culturalFact: 'In Japan, "Kabuki" is a traditional form of theater known for its elaborate costumes, stylized movements, and dramatic storytelling.', country: 'Japan' },
  { culturalFact: 'The "Mardi Gras Indians" of New Orleans, USA, are African-American tribes who create intricate costumes and participate in parades.', country: 'USA' },
  { culturalFact: 'In Tanzania, the "Hadzabe" people are one of the last remaining hunter-gatherer tribes, living a traditional lifestyle in the bush.', country: 'Tanzania' },
  { culturalFact: 'The "Carnival of Venice" in Italy is famous for its elaborate masks and costumes, with roots dating back to the 12th century.', country: 'Italy' },
  { culturalFact: 'In Iceland, the "Huldufólk" are hidden elves and spirits believed to inhabit rocks, hills, and other natural features.', country: 'Iceland' },
  { culturalFact: 'The "Pisco Sour" cocktail from Peru is made from Pisco brandy, lime juice, syrup, and egg white, and is a beloved national drink.', country: 'Peru' },
  { culturalFact: 'In Morocco, the "Atlas Mountains" are home to various Berber communities and offer stunning landscapes for trekking and exploration.', country: 'Morocco' },
  { culturalFact: 'The "Sámi Reindeer Races" in northern Scandinavia celebrate the partnership between the Sámi people and their reindeer herds.', country: 'Scandinavia' },
  { culturalFact: 'In Brazil, the "Candomblé" religion combines elements of African and Brazilian spiritual practices, honoring deities known as "Orixás."', country: 'Brazil' },
  { culturalFact: 'The "Songkran" festival in Thailand marks the traditional New Year with water fights and cleansing rituals to usher in the new year.', country: 'Thailand' },
  { culturalFact: 'In China, the "Li River" is famous for its breathtaking karst landscapes and is a source of inspiration for traditional Chinese art.', country: 'China' },
  { culturalFact: 'The "Djembe" drum, originating from West Africa, is played by various ethnic groups for rituals, celebrations, and communication.', country: 'West Africa' },
  { culturalFact: 'In Australia, "Uluru" is a sacred monolith known for its cultural and spiritual significance to the local Aboriginal people.', country: 'Australia' },
  { culturalFact: 'The "Samba" dance in Brazil is a vibrant and energetic expression of culture, often associated with the Rio de Janeiro Carnival.', country: 'Brazil' },
  { culturalFact: 'In Japan, "Shinrin Yoku" or "Forest Bathing" is a practice of immersing oneself in nature to reduce stress and promote well-being.', country: 'Japan' },
  { culturalFact: 'The "Dia de los Muertos" (Day of the Dead) in Mexico is a vibrant celebration where families honor deceased loved ones with colorful altars, marigolds, and festive food.', country: 'Mexico' },
  { culturalFact: 'In India, "Diwali" or the "Festival of Lights" is a major Hindu festival celebrated with illuminated decorations, sweets, and fireworks.', country: 'India' },
  { culturalFact: 'The "Ganesh Chaturthi" festival in India involves the installation of elaborately crafted idols of Lord Ganesha and celebrations lasting several days.', country: 'India' },
  { culturalFact: 'In Italy, "Pasta Making" is a cherished tradition passed down through generations, with each region having its own signature pasta dishes.', country: 'Italy' },
  { culturalFact: 'The "Chinese New Year" or "Spring Festival" is celebrated with vibrant parades, dragon dances, red lanterns, and traditional family gatherings.', country: 'China' },
  { culturalFact: 'In Ethiopia, the "Meskel" festival marks the finding of the True Cross by Queen Helena and is celebrated with bonfires and processions.', country: 'Ethiopia' },
  { culturalFact: 'The "Sufi Whirling" dance is a spiritual practice in Sufism, where dervishes spin in meditative circles as a form of prayer and connection with God.', country: 'Sufi tradition' },
  { culturalFact: 'In Spain, "La Tomatina" is an annual festival where participants engage in a massive tomato fight, turning the streets into a sea of red.', country: 'Spain' },
  { culturalFact: 'The "Great Barrier Reef" in Australia is not only a natural wonder but also holds deep cultural and spiritual significance for Aboriginal communities.', country: 'Australia' },
  { culturalFact: 'In Saudi Arabia, "Hajj" is the annual Islamic pilgrimage to Mecca, a mandatory religious duty for Muslims, emphasizing unity and equality.', country: 'Saudi Arabia' },
  { culturalFact: 'The "Bagpipes" are a traditional musical instrument associated with Scotland and often used to perform lively folk tunes and melodies.', country: 'Scotland' },
  { culturalFact: 'In Japan, "Hanami" is the practice of viewing and appreciating cherry blossoms, a time of joy and reflection during the spring season.', country: 'Japan' },
  { culturalFact: 'The "Bun Festival" in Hong Kong involves a parade of colorful floats and a climbing competition to reach the top of a tower covered in buns.', country: 'Hong Kong' },
  { culturalFact: 'In Iceland, "Yule Lads" are a mischievous group of characters who bring gifts to children during the Christmas season, one each night.', country: 'Iceland' },
  { culturalFact: 'The "Whale Festival" in Peru celebrates the migration of whales with coastal parades, traditional music, and educational events.', country: 'Peru' },
  { culturalFact: 'In Russia, "Matryoshka" dolls, also known as Russian nesting dolls, symbolize fertility, motherhood, and the interconnectedness of generations.', country: 'Russia' },
  { culturalFact: 'In Brazil, "Capoeira" is a unique blend of martial arts, dance, and music that originated among enslaved Africans, often practiced as a form of self-expression and resistance.', country: 'Brazil' },
  { culturalFact: 'The "Sydney Opera House" in Australia is not only an architectural marvel but also a cultural hub that hosts various performances and events.', country: 'Australia' },
  { culturalFact: 'In Nigeria, the "Aso-Oke" fabric is intricately woven and often used to make traditional clothing, representing the Yoruba culture and heritage.', country: 'Nigeria' },
  { culturalFact: 'The "Navajo" people of the United States have a rich tradition of creating intricate and meaningful "Sand Paintings" as a form of healing and spirituality.', country: 'United States' },
  { culturalFact: 'In South Korea, "Bibimbap" is a popular dish made with mixed rice, vegetables, meat, and often a fried egg, showcasing a harmonious blend of flavors.', country: 'South Korea' },
  { culturalFact: 'The "Alhambra" in Spain is a stunning palace and fortress complex known for its intricate Islamic architecture and lush gardens.', country: 'Spain' },
  { culturalFact: 'In Mexico, "Lucha Libre" is a form of professional wrestling characterized by colorful masks, acrobatic moves, and theatrical performances.', country: 'Mexico' },
  { culturalFact: 'The "Taiko" drums of Japan are played in ensembles, creating powerful rhythms that evoke a sense of unity and energy in cultural performances.', country: 'Japan' },
  { culturalFact: 'In Ethiopia, "Injera" is a staple food made from teff flour and serves as a base for various dishes, symbolizing communal dining and sharing.', country: 'Ethiopia' },
  { culturalFact: 'The "Dia de los Reyes" (Three Kings\' Day) in the Dominican Republic involves parades, music, and festive food to celebrate the Christian holiday.', country: 'Dominican Republic' },
  { culturalFact: 'In Thailand, the "Wai" gesture involves placing the palms together and bowing slightly as a sign of respect and greeting.', country: 'Thailand' },
  { culturalFact: 'The "Holi" festival in India is known as the "Festival of Colors," where people celebrate the arrival of spring by throwing colored powders and water at each other.', country: 'India' },
  { culturalFact: 'In Iran, the "Qanat" system is an ancient method of water management involving underground tunnels that bring water to arid regions.', country: 'Iran' },
  { culturalFact: 'The "Loy Krathong" festival in Thailand involves floating decorative baskets on water to honor the water goddess and release negativity.', country: 'Thailand' },
  { culturalFact: 'In Kenya, the "Maasai" people are known for their intricate beadwork, a form of artistry used to adorn clothing and jewelry with cultural symbolism.', country: 'Kenya' },
  { culturalFact: 'The "Sahara Desert" in Africa is not only the world\'s largest hot desert but also home to diverse cultures and nomadic communities.', country: 'Africa' },
  { culturalFact: 'In Peru, the "Q’eswachaka Bridge" is a traditional Inca rope bridge that is rebuilt annually using ancient weaving techniques.', country: 'Peru' },
  { culturalFact: 'The "Pilgrimage to Santiago de Compostela" in Spain involves various routes leading to the shrine of Saint James, attracting pilgrims from around the world.', country: 'Spain' },
  { culturalFact: 'In Mongolia, the "Naadam" festival showcases the "Three Manly Games" of wrestling, horse racing, and archery, highlighting traditional skills.', country: 'Mongolia' },
  { culturalFact: 'The "Whakairo" art of Maori carving in New Zealand involves intricate woodcarvings that communicate ancestral stories and cultural heritage.', country: 'New Zealand' },
  { culturalFact: 'In Nepal, "Tihar" is a festival where animals are honored, including dogs, cows, and crows, as symbols of loyalty and companionship.', country: 'Nepal' },
  { culturalFact: 'The "Taj Mahal" in India is a symbol of love and devotion, built by Emperor Shah Jahan in memory of his wife Mumtaz Mahal.', country: 'India' },
  { culturalFact: 'In Mongolia, "Gutal" is a traditional stew made with meat, vegetables, and dumplings, often cooked in a communal pot.', country: 'Mongolia' },
  { culturalFact: 'The "Kente Cloth" of the Ashanti people in Ghana is woven with vibrant colors and patterns, each symbolizing a specific meaning or proverb.', country: 'Ghana' },
  { culturalFact: 'In Thailand, "Muay Thai" is a traditional martial art known as the "Art of Eight Limbs," utilizing punches, kicks, knees, and elbows.', country: 'Thailand' },
  { culturalFact: 'The "Inuit" people of the Arctic have a rich storytelling tradition, passing down myths and legends through generations to teach values and lessons.', country: 'Arctic' },
  { culturalFact: 'In Brazil, "Candomblé" is a syncretic religion combining African, Indigenous, and Catholic beliefs, practiced through ceremonies, dance, and music.', country: 'Brazil' },
  { culturalFact: 'The "Haka" is a traditional Maori dance from New Zealand, used to convey emotions, challenge opponents, and showcase cultural identity.', country: 'New Zealand' },
  { culturalFact: 'In Thailand, the "Floating Markets" are iconic sites where vendors sell fresh produce, street food, and goods from boats along the waterways.', country: 'Thailand' },
  { culturalFact: 'The "Sitar" is a traditional stringed instrument from India, played in classical and contemporary music, contributing to the rich musical heritage.', country: 'India' },
  { culturalFact: 'In Nigeria, the "Gele" is a head wrap worn by women for special occasions, signifying status, beauty, and cultural identity.', country: 'Nigeria' },
  { culturalFact: 'The "Carnival of Binche" in Belgium features "Gilles" who wear elaborate costumes and throw oranges to drive away winter and bring good luck.', country: 'Belgium' },
  { culturalFact: 'In Greece, the "Olympic Games" originated in ancient Olympia and celebrated athleticism, arts, and cultural unity among Greek city-states.', country: 'Greece' },
  { culturalFact: 'The "Aurora Borealis" or Northern Lights are natural light displays in the polar regions, with indigenous cultures attributing spiritual significance to them.', country: 'Polar Regions' },
  { culturalFact: 'In Mongolia, "Yurts" or "Ger" are traditional portable dwellings used by nomadic herders, reflecting adaptability to the environment.', country: 'Mongolia' },
  { culturalFact: 'The "Day of the Dead" in Spain (Día de los Difuntos) involves visiting cemeteries to honor the deceased with flowers and candles.', country: 'Spain' },
  { culturalFact: 'In Afghanistan, the "Buzkashi" sport involves horse-mounted players competing to place a goat carcass in a goal, showcasing equestrian skills.', country: 'Afghanistan' },
  { culturalFact: 'The "Ngaben" or Balinese cremation ceremony in Indonesia is a complex ritual to guide the soul to the afterlife with elaborate processions.', country: 'Indonesia' },
  { culturalFact: 'In Canada, "First Nations Totem Poles" are carved wooden sculptures depicting stories, lineage, and cultural symbols of Indigenous communities.', country: 'Canada' },
  { culturalFact: 'The "Midsummer" celebration in Sweden involves dancing around a maypole, feasting on traditional foods, and celebrating the longest day of the year.', country: 'Sweden' },
  { culturalFact: 'In Japan, it is customary to bow as a form of greeting and showing respect. The depth of the bow can vary depending on the relationship and situation.', country: 'Japan' },
  { culturalFact: 'The "Feng Shui" practice in China involves arranging spaces to promote harmony and balance, with specific attention to the flow of energy or "qi."', country: 'China' },
  { culturalFact: 'In Saudi Arabia, "Ramadan" is observed as a month of fasting from sunrise to sunset, during which Muslims abstain from eating, drinking, and smoking.', country: 'Saudi Arabia' },
  { culturalFact: 'In India, "Namaste" is a common greeting accompanied by a slight bow and palms pressed together, symbolizing respect for the divine within each person.', country: 'India' },
  { culturalFact: 'The "Day of the Dead" in Mexico is a belief that deceased loved ones return to visit the living. Families create altars with offerings to honor and welcome them.', country: 'Mexico' },
  { culturalFact: 'In Thailand, it is considered impolite to point your feet at someone or religious objects, as the feet are seen as the lowest part of the body.', country: 'Thailand' },
  { culturalFact: 'The "Great Spirit" is a concept in Native American cultures, representing a higher power that connects all living beings and the natural world.', country: 'Native American' },
  { culturalFact: 'In Ethiopia, the "Mesob" is a traditional woven basket used to serve and share communal meals, emphasizing the importance of collective dining.', country: 'Ethiopia' },
  { culturalFact: 'The "Passover Seder" in Jewish tradition involves retelling the story of the Exodus and sharing symbolic foods to commemorate the journey to freedom.', country: 'Jewish tradition' },
  { culturalFact: 'In South Korea, it is customary to remove your shoes before entering a home as a sign of respect and to keep indoor spaces clean.', country: 'South Korea' },
  { culturalFact: 'The "Pachamama" belief among Andean cultures involves revering the Earth as a living entity and making offerings to maintain a harmonious relationship.', country: 'Andean cultures' },
  { culturalFact: 'In Nepal, "Kumari" is the living goddess chosen from a young girl, representing divine feminine energy and appearing at religious events and festivals.', country: 'Nepal' },
  { culturalFact: 'The "Jizo" statues in Japan are believed to protect travelers, children, and souls of the deceased, often adorned with bibs and caps as symbols of care.', country: 'Japan' },
  { culturalFact: 'In Nigeria, "Igbo Mmanwu" masquerades are colorful and dynamic performances representing ancestral spirits during festivals and cultural celebrations.', country: 'Nigeria' },
  { culturalFact: 'The "Tattoo" art form among Maori people of New Zealand tells personal stories and genealogy, representing connections to heritage and cultural identity.', country: 'New Zealand' },
  { culturalFact: 'In Russia, "Matryoshka" dolls symbolize family and fertility, with each nested doll representing different generations and stages of life.', country: 'Russia' },
  { culturalFact: 'The "Navajo" people believe in the importance of harmony known as "Hózhǫ́ǫ́gi," striving for balance, health, and beauty in both the physical and spiritual realms.', country: 'Navajo' },
  { culturalFact: 'In Egypt, the "Ankh" symbol represents life and immortality, often depicted in the hands of deities and pharaohs as a symbol of divine power.', country: 'Egypt' },
  { culturalFact: 'The "Bushido" code among the samurai of Japan emphasized virtues like loyalty, honor, and self-discipline, influencing ethical behavior and cultural values.', country: 'Japan' },
  { culturalFact: 'In South Korea, it is common to use both hands or offer support with one hand when giving or receiving something, a gesture of respect and politeness.', country: 'South Korea' },
  { culturalFact: 'The "Elders Council" in Ghana plays a crucial role in making important community decisions and preserving cultural traditions passed down through generations.', country: 'Ghana' },
  { culturalFact: 'In Japan, "Omotenashi" is the art of impeccable hospitality, ensuring guests feel comfortable and well-cared-for during their interactions.', country: 'Japan' },
  { culturalFact: 'In Iran, "Haft-Seen" is a tabletop arrangement of seven symbolic items that represent different concepts, displayed during the Persian New Year (Nowruz).', country: 'Iran' },
  { culturalFact: 'The "Bantu Ubuntu" philosophy, prevalent in many African cultures, emphasizes the interconnectedness of all people and the importance of community.', country: 'African cultures' },
  { culturalFact: 'In India, "Ayurveda" is a holistic healing system that focuses on maintaining balance between the body, mind, and spirit through natural remedies and practices.', country: 'India' },
  { culturalFact: 'The "Haka" performed by the Maori people of New Zealand is not only a traditional war dance but also a powerful way to express cultural identity and unity.', country: 'New Zealand' },
  { culturalFact: 'In Greece, breaking plates during celebratory occasions like weddings and festivals symbolizes the release of negative energy and the beginning of a new phase.', country: 'Greece' },
  { culturalFact: 'The "Nguni Cattle" of Southern Africa hold cultural significance for the Zulu people, representing wealth, social status, and a connection to ancestral spirits.', country: 'Southern Africa' },
  { culturalFact: 'In Mongolia, "Naadam" festivals showcase traditional "Three Manly Games" of wrestling, horse racing, and archery, celebrating skills valued in nomadic life.', country: 'Mongolia' },
  { culturalFact: 'The "Baguazhang" martial art of China is inspired by the philosophy of the "I Ching" and incorporates circular movements to achieve harmony and balance.', country: 'China' },
  { culturalFact: 'In Russia, the "Dacha" tradition involves having a countryside retreat where families grow their own food, fostering a connection to nature and self-sufficiency.', country: 'Russia' },
  { culturalFact: 'The "Māori Powhiri" in New Zealand is a formal welcoming ceremony that involves speeches, chanting, and the pressing of noses as a gesture of greeting.', country: 'New Zealand' },
  { culturalFact: 'In Iran, the "Yalda Night" marks the longest night of the year, celebrated by staying up late, reading poetry, and eating symbolic foods to welcome longer days.', country: 'Iran' },
  { culturalFact: 'The "Barter System" among Indigenous peoples of North America involves exchanging goods and services without using money, emphasizing cooperation and reciprocity.', country: 'North America' },
  { culturalFact: 'In Ethiopia, "Abyssinian Baptism" is a Christian tradition where infants receive a special baptismal garment and blessings for protection and spiritual growth.', country: 'Ethiopia' },
  { culturalFact: 'The "San Bushmen" of Southern Africa have a deep spiritual connection to the land, using rock art to communicate with the spirits and record their stories.', country: 'Southern Africa' },
  { culturalFact: 'The "Buddha Bowl" in Bhutan is a hand-crafted wooden container filled with rice, vegetables, and other ingredients, symbolizing good luck and prosperity.', country: 'Bhutan' },
  { culturalFact: 'In South Africa, "Ubuntu" is a philosophy that emphasizes humanity, compassion, and interconnectedness, often summarized by the phrase "I am because we are."', country: 'South Africa' },
  { culturalFact: 'The "Floating Lantern Festival" in Thailand, known as "Yi Peng," involves releasing illuminated lanterns into the night sky as a symbol of letting go of negative energy.', country: 'Thailand' },
  { culturalFact: 'In Argentina, "Mate" is a traditional herbal tea often shared among friends and family, fostering a sense of unity and camaraderie during social gatherings.', country: 'Argentina' },
  { culturalFact: 'The "Lunar New Year" is celebrated across various Asian cultures with distinct traditions. In Vietnam, it is known as "Tết," featuring festive decorations and special foods.', country: 'Vietnam' },
  { culturalFact: 'In Native American cultures, "Sweat Lodges" are used for purification ceremonies, involving a small structure heated by rocks to create a sauna-like experience.', country: 'Native American cultures' },
  { culturalFact: 'In Egypt, "Islamic Calligraphy" is a revered art form where Quranic verses are intricately written to create visually stunning and spiritually meaningful compositions.', country: 'Egypt' },
  { culturalFact: 'The "Cherry Blossom Viewing" tradition in Japan, called "Hanami," involves picnicking under blooming cherry blossoms, appreciating their beauty and ephemeral nature.', country: 'Japan' },
  { culturalFact: 'In Israel, the "Sabbath" or "Shabbat" is observed from Friday evening to Saturday evening, involving rest, family time, and special meals to honor God\'s day of rest.', country: 'Israel' },
  { culturalFact: 'The "Sawdust Carpets" of Guatemala are intricate carpets made from dyed sawdust, flowers, and other natural materials, created as a temporary art form during religious processions.', country: 'Guatemala' },
  { culturalFact: 'In Tibet, the "Prayer Flag" tradition involves hanging colorful flags inscribed with prayers and mantras, allowing the wind to carry the blessings and spread positivity.', country: 'Tibet' },
  { culturalFact: 'The "Pounamu" or greenstone carving of New Zealand\'s Maori people holds spiritual significance, passed down through generations as a symbol of identity and connection.', country: 'New Zealand' },
  { culturalFact: 'In France, "La Bise" is the common cheek-kissing greeting, varying in the number of kisses exchanged and regional customs, showing familiarity and warmth.', country: 'France' },
  { culturalFact: 'The "Holi" festival in India celebrates the arrival of spring with vibrant colors, water fights, and joyful gatherings that bridge social gaps and promote unity.', country: 'India' },
  { culturalFact: 'In Nigeria, "Gele" is not only a headwrap but also a form of artistic expression, with various styles and patterns conveying different cultural meanings and identities.', country: 'Nigeria' },
  { culturalFact: 'The "Obon Festival" in Japan is a time to honor ancestors through dance, rituals, and lighting of lanterns, symbolizing the return of spirits to the world.', country: 'Japan' },
  { culturalFact: 'In Ireland, "St. Patrick\'s Day" celebrates the patron saint of Ireland with parades, green attire, and festive gatherings that showcase Irish culture and heritage.', country: 'Ireland' },
  { culturalFact: 'The "Gaucho" culture in Argentina is characterized by skilled horseback riding, traditional clothing, and cattle herding, symbolizing the life of rural cowboys.', country: 'Argentina' },
  { culturalFact: 'In Nepal, the "Bindi" worn by women is a decorative dot applied to the forehead, often indicating marital status or serving as a symbol of spirituality.', country: 'Nepal' },
  { culturalFact: 'The "Tea Ceremony" in China and Japan is a choreographed ritual where the preparation and sharing of tea emphasize mindfulness, tranquility, and social harmony.', country: 'China, Japan' },
  { culturalFact: 'In Ghana, the "Kente Cloth" is not only a fabric but also a visual language, with different patterns and colors conveying specific meanings and stories.', country: 'Ghana' },
  { culturalFact: 'In Bhutan, the concept of "Gross National Happiness" is prioritized over GDP, focusing on holistic well-being, spiritual values, and cultural preservation.', country: 'Bhutan' },
  { culturalFact: 'The "Dia de los Muertos" (Day of the Dead) in Mexico is a time to honor deceased loved ones by creating elaborate altars with their favorite foods, photos, and mementos.', country: 'Mexico' },
  { culturalFact: 'In Sweden, "Fika" is a cherished tradition of taking a break with coffee and a pastry, fostering social connections and relaxation during the day.', country: 'Sweden' },
  { culturalFact: 'The "Navajo" people believe in the importance of "Hózhǫ́ǫ́gi" or harmony, maintaining balance within oneself, the community, and the natural world.', country: 'Navajo' },
  { culturalFact: 'In India, "Holi" is celebrated with exuberant color fights, symbolizing the triumph of good over evil and the arrival of spring, fostering unity and joy.', country: 'India' },
  { culturalFact: 'The "Gamelan" orchestras of Indonesia consist of traditional instruments and are used in various ceremonies and events to create intricate, layered music.', country: 'Indonesia' },
  { culturalFact: 'In Ethiopia, sharing a communal "Injera" meal involves breaking bread together from the same large piece of sourdough flatbread, signifying unity and togetherness.', country: 'Ethiopia' },
  { culturalFact: 'The "Maori Haka" of New Zealand is a powerful war dance, also performed in celebrations, showcasing Maori pride, strength, and cultural identity.', country: 'New Zealand' },
  { culturalFact: 'In Mongolia, "Yak Herding" is a traditional livelihood for many nomadic families, with yaks providing milk, meat, wool, and transportation in rugged terrains.', country: 'Mongolia' },
  { culturalFact: 'The "Eid al-Fitr" celebration at the end of Ramadan involves communal prayers, feasting, and acts of charity among Muslim communities worldwide.', country: 'Muslim communities' },
  { culturalFact: 'In Japan, "Ikebana" is the art of flower arranging that emphasizes harmony, balance, and simplicity, often reflecting the changing seasons and natural beauty.', country: 'Japan' },
  { culturalFact: 'The "Samurai" of Japan followed the "Bushido" code, embodying virtues such as honor, loyalty, and self-discipline, shaping their conduct on and off the battlefield.', country: 'Japan' },
  { culturalFact: 'In Greece, smashing plates at celebrations is a traditional custom called "Sirtaki," symbolizing joy, letting go of negative energy, and encouraging festive dancing.', country: 'Greece' },
  { culturalFact: 'The "Kente Cloth" of Ghana features intricate patterns and colors, with each combination symbolizing different concepts, making it a form of visual storytelling.', country: 'Ghana' },
  { culturalFact: 'In Tibet, "Sky Burials" involve placing deceased bodies on mountaintops to be consumed by vultures, aligning with Tibetan beliefs about the cycle of life and death.', country: 'Tibet' },
  { culturalFact: 'The "Torii Gates" in Japan mark the entrance to Shinto shrines, symbolizing the transition from the ordinary to the sacred, and inviting visitors to connect with the divine.', country: 'Japan' },
  { culturalFact: 'In Kenya, "Masai Mara" is a nature reserve known for the annual wildebeest migration, showcasing the interconnectedness of ecosystems and the diversity of wildlife.', country: 'Kenya' },
  { culturalFact: 'The "Aurora Borealis" or Northern Lights have significant cultural meanings for indigenous communities in the Arctic, often interpreted as messages from ancestors.', country: 'Arctic' },
  { culturalFact: 'In Iran, "Nowruz" is the Persian New Year, celebrated with a symbolic "Haft-Seen" table, special foods, and fire-jumping to welcome the arrival of spring.', country: 'Iran' },
  { culturalFact: 'The "Dia de los Reyes" (Three Kings\' Day) in Spain involves festive parades, children leaving shoes out for gifts, and consuming a special "Rosca de Reyes" cake.', country: 'Spain' },
  { culturalFact: 'In Japan, "Hanami" is the tradition of enjoying cherry blossoms in spring, often involving picnics, social gatherings, and appreciating the transient beauty of nature.', country: 'Japan' },
  { culturalFact: 'The "Navajo" people of the United States practice the "Beauty Way" philosophy, emphasizing harmony, balance, and living in alignment with natural and spiritual forces.', country: 'United States' },
  { culturalFact: 'In South Korea, "Jeong" is a cultural concept that encompasses deep affection, loyalty, and connection between individuals, reflecting strong interpersonal bonds.', country: 'South Korea' },
  { culturalFact: 'The "Great Barrier Reef" in Australia is not only a natural wonder but also holds cultural significance for Indigenous communities as a spiritual and sacred place.', country: 'Australia' },
  { culturalFact: 'In Peru, "Inti Raymi" is a traditional Incan festival celebrating the winter solstice and the sun god Inti, with vibrant ceremonies and processions.', country: 'Peru' },
  { culturalFact: 'The "Bunad" in Norway is a traditional costume often worn on special occasions, with distinct regional designs that reflect the country\'s history and diversity.', country: 'Norway' },
  { culturalFact: 'In Egypt, the "Pyramids of Giza" stand as ancient marvels that served as tombs for pharaohs, showcasing advanced engineering and religious significance.', country: 'Egypt' },
  { culturalFact: 'The "Bonsai" art of Japan involves cultivating miniature trees, symbolizing nature\'s beauty, patience, and the connection between the physical and spiritual worlds.', country: 'Japan' },
  { culturalFact: 'In Nepal, "Sherpas" are renowned for their mountaineering expertise and assistance to climbers on treacherous Himalayan expeditions, showcasing resilience and strength.', country: 'Nepal' },
  { culturalFact: 'The "Carnival of Venice" in Italy is famous for elaborate masks and costumes, originating in the 12th century and celebrating the diverse essence of the city.', country: 'Italy' },
  { culturalFact: 'In Thailand, "Wai Khru" is a ceremony where students pay respect to their teachers, demonstrating gratitude and humility for their guidance and knowledge.', country: 'Thailand' },
  { culturalFact: 'The "Dia de los Muertos" (Day of the Dead) in Mexico is a joyful celebration where families create "ofrendas" or altars to honor deceased loved ones with offerings.', country: 'Mexico' },
  { culturalFact: 'In Sweden, "Allemansrätten" or "Everyman\'s Right" allows people to roam freely in nature, emphasizing the connection between people and the environment.', country: 'Sweden' },
  { culturalFact: 'The "Maasai" of Kenya and Tanzania value cattle as sacred beings, believing that their spiritual connection to cattle provides sustenance and reflects their identity.', country: 'Kenya, Tanzania' },
  { culturalFact: 'In Greece, "Opa!" is an exclamation used to express joy, enthusiasm, or celebration, often accompanied by dancing and breaking plates during festive moments.', country: 'Greece' },
  { culturalFact: 'The "Kente Cloth" of Ghana is woven by hand, with each color and pattern representing specific meanings or proverbs, making it a visual form of storytelling.', country: 'Ghana' },
  { culturalFact: 'In Japan, "Noh" is a traditional theatrical art form that combines music, dance, and drama, often featuring masked performers and historical or mythical stories.', country: 'Japan' },
  { culturalFact: 'The "Bagpipes" are associated with Scotland, often played during ceremonies, parades, and celebrations, reflecting the country\'s rich musical and cultural heritage.', country: 'Scotland' },
  { culturalFact: 'In India, "Sari" is a versatile traditional garment worn by women, representing elegance and grace, with various styles and fabrics that reflect regional diversity.', country: 'India' },
  { culturalFact: 'In the mystical forests of Japan, cherry blossoms burst forth like delicate whispers, painting the landscape with shades of blush and innocence during the enchanting ritual of "Hanami."', country: 'Japan' },
  { culturalFact: 'Amidst the sweeping red deserts of Australia, the "Dreamtime" stories are woven by the stars, carrying the ancient wisdom of Indigenous communities across time and space.', country: 'Australia' },
  { culturalFact: 'Beneath the watchful eyes of the Andean mountains, the "Inti Raymi" festival in Peru unveils a dance of sun and shadows, as the Incas honor their golden deity and bid farewell to winter.', country: 'Peru' },
  { culturalFact: 'Through the heartbeats of South Korea, the essence of "Jeong" resonates like a secret melody, binding souls in a tapestry of connection that transcends time and distance.', country: 'South Korea' },
  { culturalFact: 'In the hidden chambers of Egypt\'s pyramids, the whispers of pharaohs echo in the cool air, a testament to humanity\'s quest for immortality and the grandeur of the ancient world.', country: 'Egypt' },
  { culturalFact: 'Across the windswept plains of Mongolia, nomadic spirits guide herders as they journey on the back of sturdy yaks, a partnership as enduring as the boundless horizons.', country: 'Mongolia' },
  { culturalFact: 'Amidst the rhythm of flamenco heels in Spain, the "Feria de Abril" unfurls a tapestry of colors and claps, transforming Seville into a vibrant kaleidoscope of joy and celebration.', country: 'Spain' },
  { culturalFact: 'In the quiet corners of Norway, the "Bunad" whispers tales of fjords and fjells, a garment woven with threads of heritage and belonging, embodying the spirit of generations.', country: 'Norway' },
  { culturalFact: 'Beneath the shimmering lights of the Aurora Borealis, Arctic dreams take flight, as whispers of ancestors dance among the stars, painting the night sky with secrets and stories.', country: 'Arctic' },
  { culturalFact: 'In the heartlands of Mexico, "Dia de los Muertos" is a fiesta of life and death, as marigold petals guide departed souls back to the living world, where joy and memory intertwine.', country: 'Mexico' },
  { culturalFact: 'Through the bustling bazaars of India, the "Sari" drapes tales of femininity and grace, each fold a chapter of resilience, a canvas for cultural diversity that flows like a river of color.', country: 'India' },
  { culturalFact: 'Among the rugged peaks of Kenya, "Maasai" warriors dance in the golden sun, their vibrant "shuka" cloaks capturing the spirit of the savannah and the rhythm of the land.', country: 'Kenya' },
  { culturalFact: 'In the Scottish highlands, the haunting notes of bagpipes echo across time, a symphony that carries the whispers of clans, battles, and the mist-shrouded magic of ancient hills.', country: 'Scotland' },
  { culturalFact: 'In the serene temples of Japan, "Noh" masks awaken tales of spirits and samurais, an ethereal dance between the seen and unseen, a portal to centuries of stories etched in wood and myth.', country: 'Japan' },
  { culturalFact: 'Among the vibrant tapestries of Ghana, "Kente Cloth" weaves stories of courage and heritage, a visual language that speaks of unity, proverbs, and the threads that bind us all.', country: 'Ghana' },
  { culturalFact: 'In the heartbeats of Native American lands, the "Beauty Way" whispers of harmony with the earth, of footsteps guided by stars and the ancient songlines of the land.', country: 'Native American' },
  { culturalFact: 'Through the bustling streets of Greece, the exuberant cry of "Opa!" ignites a dance of plates and souls, a celebration that ignites joy and releases the spirit of carefree revelry.', country: 'Greece' },
  { culturalFact: 'Beneath the fluttering flags of Bhutan, "Gross National Happiness" weaves a tale of prosperity beyond gold, where laughter, unity, and contentment form the fabric of a unique kingdom.', country: 'Bhutan' },
  { culturalFact: 'In the enchanting tales of Arabian nights, Saudi Arabia\'s "Ramadan" unfurls as a luminous crescent moon, a time of fasting and reflection that unites hearts and souls in prayer.', country: 'Saudi Arabia' },
  { culturalFact: 'Among the whispering dunes of Argentina, the "Gaucho" gallops as a guardian of the Pampas, embodying the spirit of freedom and the symphony of hooves that resonates with the land.', country: 'Argentina' },
  { culturalFact: 'In the heart of India, the "Diwali" festival sets the night ablaze with a tapestry of lights, as the heavens join Earth in celebrating the triumph of light over darkness.', country: 'India' },
  { culturalFact: 'Under the Northern Lights of Sweden, the "Midsummer" eve enchants the land, where Maypoles rise like guardians, and flower crowns weave stories of ancient rituals and joy.', country: 'Sweden' },
  { culturalFact: 'Amidst the rolling hills of Ireland, ancient "Celtic Knots" entwine like whispers of eternity, an intricate dance of lines and loops that mirror life\'s boundless connections.', country: 'Ireland' },
  { culturalFact: 'Beneath the acacia trees of Kenya, Maasai elders gather to whisper stories to the winds, painting tales of lions, stars, and ancestors on the canvas of the savannah.', country: 'Kenya' },
  { culturalFact: 'Among the bustling markets of Morocco, "Medina" alleys wind like secrets through time, revealing vibrant bazaars where the aroma of spices tells tales of distant lands.', country: 'Morocco' },
  { culturalFact: 'In the soulful melodies of Brazil, "Samba" rhythms ignite like fireflies in the night, as dancers sway to beats that echo the heartbeats of a nation pulsing with life.', country: 'Brazil' },
  { culturalFact: 'Through the quiet temples of Japan, "Zazen" meditation blooms like a lotus, a serene practice where stillness becomes a journey to the depths of one\'s own existence.', country: 'Japan' },
  { culturalFact: 'Under the expansive skies of Mongolia, nomads ride the "Steppe" like whispers on horseback, their lives woven with the wind as they traverse horizons both wide and endless.', country: 'Mongolia' },
  { culturalFact: 'In the arid landscapes of Egypt, "Hieroglyphs" etch tales of pharaohs and gods on ancient walls, the language of symbols that spans millennia, preserving stories in stone.', country: 'Egypt' },
  { culturalFact: 'Within the intricate patterns of Persian "Rugs," stories unravel thread by thread, a canvas where history, artistry, and the soul of a people are woven together.', country: 'Persia' },
  { culturalFact: 'In the heart of Spain, the "Flamenco" dancer moves like a tempest, stomping heels and fluttering skirts releasing emotions that resonate with the passionate spirit of Andalusia.', country: 'Spain' },
  { culturalFact: 'Amidst the vibrant colors of India\'s "Holi" festival, laughter becomes a canvas, splattering joy and camaraderie in every hue as people playfully embrace the rainbow of life.', country: 'India' },
  { culturalFact: 'Under the starlit skies of New Zealand, the "Haka" warrior chants echo like ancient thunder, a fierce and proud dance that speaks to the heart of Maori heritage and unity.', country: 'New Zealand' },
  { culturalFact: 'In the rolling vineyards of France, the clink of "Wine Glasses" forms a symphony of toasts, as centuries of tradition flow like the cherished nectar that unites hearts.', country: 'France' },
  { culturalFact: 'Beneath the cherry blossoms of Japan, the "Tea Ceremony" unfolds like a dance of mindfulness, each sip an invitation to stillness, grace, and the beauty of the present.', country: 'Japan' },
  { culturalFact: 'Through the alleys of Morocco, the "Call to Prayer" rises like a lyrical breeze, a tapestry of melodies that blankets the streets and calls the faithful to reflection.', country: 'Morocco' },
  { culturalFact: 'In the heart of Tibetan monasteries, "Prayer Flags" flutter like whispers to the universe, carrying the hopes and blessings of a people seeking harmony with the cosmos.', country: 'Tibet' },
  { culturalFact: 'Amidst the rhythms of African drums, "Masked Dancers" embody spirits and stories, their movements weaving tales of ancestors, nature, and the energy of the vibrant continent.', country: 'Africa' },
  { culturalFact: 'In the sacred chambers of Egypt\'s pyramids, pharaohs slumber like legends, their journey to the afterlife guarded by secrets etched in stone and dreams that span eternity.', country: 'Egypt' },
  { culturalFact: 'Through the pages of Japanese "Haiku," emotions bloom like fragile blossoms, capturing moments in syllables that transcend time, inviting reflection on nature and existence.', country: 'Japan' },
  { culturalFact: 'In the heart of India, "Rangoli" adorns doorsteps with colorful patterns, welcoming prosperity and guests into homes during festivals.', country: 'India' },
  { culturalFact: 'Among the fjords of Norway, the "Northern Lights" dance like spirits across the sky, weaving tales of magic and wonder in the silent Arctic night.', country: 'Norway' },
  { culturalFact: 'Amidst the tides of Japan\'s "Sumo Wrestling," colossal champions grapple like giants, their strength and rituals intertwining sport with tradition.', country: 'Japan' },
  { culturalFact: 'Within the labyrinthine souks of Morocco, "Mint Tea" is served in a symphony of sips, the warmth and ritual inviting connection and hospitality.', country: 'Morocco' },
  { culturalFact: 'Beneath the stars of Argentina, "Tango" emerges as a dance of passion, two souls entwining in the night to tell stories of love and longing.', country: 'Argentina' },
  { culturalFact: 'In the heart of China, "Chinese Calligraphy" flows like a river of characters, each brushstroke a poetic dance that captures the essence of the written word.', country: 'China' },
  { culturalFact: 'Among the ruins of Rome, the "Colosseum" echoes with the roars of ancient gladiators, a testament to the grandeur and brutality of a bygone era.', country: 'Italy' },
  { culturalFact: 'Amidst the sands of Saudi Arabia, the "Bedouin" nomads wander like whispers in the desert wind, carrying stories and survival across the dunes.', country: 'Saudi Arabia' },
  { culturalFact: 'Beneath the rhythms of Brazil\'s "Samba," the pulse of Carnival beats like a heart, uniting revelers in a colorful explosion of music, dance, and joy.', country: 'Brazil' },
  { culturalFact: 'In the heart of Nepal, "Namaste" is more than a greeting, it\'s a gesture that acknowledges the divine spark within each person, an unspoken connection.', country: 'Nepal' },
  { culturalFact: 'Within the depths of Scotland\'s lochs, the legend of "Nessie" stirs like ripples, a mysterious creature whose tales blend myth and reality.', country: 'Scotland' },
  { culturalFact: 'Amidst the pyramids of Egypt, "Hieroglyphs" unravel as tales of gods, pharaohs, and the eternal journey that bridges the realms of the living and the afterlife.', country: 'Egypt' },
  { culturalFact: 'In the heart of Ghana, the "Adinkra Symbols" speak in whispers of unity, wisdom, and the interconnected stories of a people rich in heritage.', country: 'Ghana' },
  { culturalFact: 'Among the cherry blossoms of Japan, the "Koi Fish" swims like a warrior, embodying strength, courage, and determination in the tranquil waters.', country: 'Japan' },
  { culturalFact: 'Beneath the soaring arches of France\'s "Notre-Dame," centuries of history whisper in the stone, a testament to the endurance of human creativity and faith.', country: 'France' },
  { culturalFact: 'Within the sand dunes of Namibia, the "Himba" people wear ochre as a sacred adornment, a connection to ancestors and the earth that sustains them.', country: 'Namibia' },
  { culturalFact: 'Amidst the vibrant textiles of Guatemala, "Mayan Weaving" tells stories through threads, each pattern and color a chapter in the ancient tapestry of culture.', country: 'Guatemala' },
  { culturalFact: 'In the heart of China, the "Great Wall" stretches like a dragon across landscapes, a testament to human ambition and the collective spirit of a nation.', country: 'China' },
  { culturalFact: 'Among the dunes of Peru, "Nazca Lines" etch tales of animals and shapes into the earth, an enigmatic connection between ancient civilization and the cosmos.', country: 'Peru' },
  { culturalFact: 'Beneath the stars of Egypt, the "Nile River" winds like a lifeline, nurturing lands, cultures, and civilizations that have flourished along its fertile banks.', country: 'Egypt' },
  { culturalFact: 'Within the harmony of "Gamelan" music in Indonesia, bronze instruments sing like spirits, a symphony that mirrors the rhythm of life and the universe.', country: 'Indonesia' },
  { culturalFact: 'Amidst the deserts of the United Arab Emirates, "Dubai\'s Burj Khalifa" pierces the sky like a futuristic marvel, a symbol of human imagination and achievement.', country: 'United Arab Emirates' },
  { culturalFact: 'In the heart of Italy, the "Venetian Carnival" unfolds as a masquerade of mystery, where masks become portals to a world of elegance, allure, and enchantment.', country: 'Italy' },
  { culturalFact: 'Among the vibrant streets of Mexico City, the "Day of the Dead" emerges as a celebration of life and death, where altars bloom with offerings of memory and love.', country: 'Mexico' },
  { culturalFact: 'Beneath the arches of Greece, the "Parthenon" stands like a beacon, an ancient temple dedicated to Athena that embodies the wisdom and legacy of an enduring civilization.', country: 'Greece' },
  { culturalFact: 'Within the colors of Nepal\'s "Prayer Flags," whispers ride the wind, carrying prayers and intentions to the heavens as they dance among the elements.', country: 'Nepal' },
  { culturalFact: 'Amidst the hills of Scotland, "Bagpipes" resonate like an anthem of the soul, their melodies a bridge between the ancient past and the spirited present.', country: 'Scotland' },
  { culturalFact: 'Beneath the shimmering lights of Australia\'s "Sydney Opera House," the arts converge like sails in the harbor, a modern marvel that amplifies creativity and innovation.', country: 'Australia' },
  { culturalFact: 'In the heart of Russia, the "Ballet" unfolds like a dance of emotions, a symphony of movements that convey stories without words, a testament to grace and discipline.', country: 'Russia' },
  { culturalFact: 'Among the rhythms of Brazil\'s "Capoeira," dance and combat entwine like spirits in motion, a celebration of freedom and strength that echoes the resilience of ancestors.', country: 'Brazil' },
  { culturalFact: 'Within the tranquility of Japan\'s "Zen Gardens," raked gravel and carefully placed stones invite meditation and reflection, a path to inner stillness amid the chaos of the world.', country: 'Japan' },
  { culturalFact: 'Amidst the colors of Ghana\'s "Kente Cloth," stories are woven like threads, each vibrant pattern a narrative that whispers of unity, pride, and cultural heritage.', country: 'Ghana' },
  { culturalFact: 'Amidst the pyramids of Mexico, the "Teotihuacan" complex rises like a city of gods, a testament to ancient engineering and spirituality that still mystifies archaeologists.', country: 'Mexico' },
  { culturalFact: 'Within the fjords of New Zealand, "Maori Carvings" etch tales of ancestors and traditions into wood and stone, a living art form that bridges the past and the present.', country: 'New Zealand' },
  { culturalFact: 'In the heart of Mongolia, the "Ger" or "Yurt" stands like a portable home, a nomadic symbol of resilience that embraces the vast landscapes and changing horizons.', country: 'Mongolia' },
  { culturalFact: 'Among the pages of Indian "Epics," gods and heroes rise like constellations, their tales a cosmic dance that merges the realms of myth, morality, and humanity.', country: 'India' },
  { culturalFact: 'Beneath the rhythm of Irish "Step Dance," feet tap like whispers on the earth, a spirited celebration that weaves history, tradition, and music into a mesmerizing spectacle.', country: 'Ireland' },
  { culturalFact: 'Within the bustling markets of Turkey, the "Grand Bazaar" unfurls like a labyrinthine tapestry of treasures, where ancient alleyways whisper tales of commerce and culture.', country: 'Turkey' },
  { culturalFact: 'Amidst the colors of South Africa\'s "Ndebele Art," geometric patterns tell stories of identity, unity, and heritage, painted with vibrant hues on walls and ceramics.', country: 'South Africa' },
  { culturalFact: 'In the heart of China, "Confucianism" emerges as a philosophy that guides generations, emphasizing respect, family, and social harmony as pillars of a meaningful life.', country: 'China' },
  { culturalFact: 'Beneath the melodies of Peru\'s "Pan Flutes," breath dances like whispers through reeds, a serenade that echoes the Andean landscapes and evokes ancient spirits.', country: 'Peru' },
  { culturalFact: 'Among the mystique of Egypt, the "Valley of the Kings" cradles pharaohs in eternal rest, tombs that conceal treasures and mysteries beneath the shifting sands of time.', country: 'Egypt' },
  { culturalFact: 'Within the serenity of Japanese "Bonsai," miniature trees emerge like sculptures, a harmonious connection between human touch and nature\'s wild essence.', country: 'Japan' },
  { culturalFact: 'Amidst the songs of the Appalachian Mountains, "Bluegrass Music" emerges like a blend of storytelling and foot-tapping rhythms, a testament to American roots and soul.', country: 'United States' },
  { culturalFact: 'In the heart of Thailand, "Floating Markets" drift like vibrant dreams on water, where boats become stalls, and commerce intertwines with local traditions and flavors.', country: 'Thailand' },
  { culturalFact: 'Among the peaks of Nepal, "Mount Everest" rises like an eternal challenge, a pinnacle of human ambition that beckons adventurers and dreamers from around the world.', country: 'Nepal' },
  { culturalFact: 'Beneath the rhythm of Cuba\'s "Rumba," dance and percussion fuse like a heartbeat, a spirited celebration that speaks to the soul of Afro-Cuban culture and resilience.', country: 'Cuba' },
  { culturalFact: 'Within the vibrant colors of Mexico\'s "Alebrijes," fantastical creatures emerge like dreams given form, a testament to the imagination and spirit of Mexican artisans.', country: 'Mexico' },
  { culturalFact: 'Amidst the coral reefs of Australia, "Aboriginal Dreamtime" stories drift like echoes, carrying wisdom and lore of creation, spirits, and the land itself.', country: 'Australia' },
  { culturalFact: 'In the heart of Argentina, the "Gaucho" rides like a guardian of the Pampas, a cowboy whose tales mirror the vast landscapes and spirit of independence.', country: 'Argentina' },
  { culturalFact: 'Beneath the rhythms of Indonesia, "Batik" emerges like painted poetry on fabric, a dance of wax and dyes that reflects traditions, symbols, and the hands of artisans.', country: 'Indonesia' },
  { culturalFact: 'Within the melodies of Japan\'s "Shakuhachi," bamboo breathes like an ancient whisper, a soulful tune that transcends time and invites reflection on nature and self.', country: 'Japan' },
  { culturalFact: 'Amidst the pages of Ghana\'s "Ananse Stories," the spider god Ananse spins tales like webs, clever and cunning, weaving lessons, humor, and the essence of folklore.', country: 'Ghana' },
  { culturalFact: 'In the heart of Russia, the "Matryoshka Doll" emerges like a nesting symphony of generations, each doll a testament to the interconnectedness of family and tradition.', country: 'Russia' },
  { culturalFact: 'Among the colors of India\'s "Holi" festival, laughter becomes a canvas, splattering joy and camaraderie in every hue as people playfully embrace the rainbow of life.', country: 'India' },
  { culturalFact: 'Beneath the steps of Spain\'s "Flamenco," emotions rise like flames, a passionate dance that speaks of heartache, longing, and the fierce spirit of Andalusia.', country: 'Spain' },
  { 
    culturalFact: 'India: In the vibrant tapestry of India, the "Holi" festival paints the air with a kaleidoscope of colors, as people playfully drench each other in hues of joy to celebrate the arrival of spring.',
    country: 'India'
  },
  { 
    culturalFact: 'Italy: In the romantic streets of Venice, the "Carnival" enchants with masks that conceal secrets and fantasies, inviting a masquerade where identities become a tapestry of mystery.',
    country: 'Italy'
  },
  { 
    culturalFact: 'Japan: Amidst serene cherry blossom petals, "Hanami" blooms as a cherished tradition, where families and friends gather under blossoming trees to celebrate the fleeting beauty of spring.',
    country: 'Japan'
  },
  { 
    culturalFact: 'Mexico: On the Day of the Dead, altars adorned with marigolds and sugar skulls honor departed loved ones, weaving a tapestry that unites the living and the spirits in a celebration of life.',
    country: 'Mexico'
  },
  { 
    culturalFact: 'Egypt: Amidst the enigmatic pyramids, the "Book of the Dead" unfolds as a guide to the afterlife, offering insights into ancient beliefs and rituals that transcend the boundaries of mortality.',
    country: 'Egypt'
  },
  { 
    culturalFact: 'Brazil: In the pulsating rhythms of "Samba," dancers sway like palm trees in the wind, expressing the exuberance of Brazilian culture through movements that echo the heartbeats of a nation.',
    country: 'Brazil'
  },
  { 
    culturalFact: 'Greece: Within the stone columns of the "Parthenon," history and mythology converge, a testament to Athens\' golden age and the legacy of gods and heroes that continue to inspire.',
    country: 'Greece'
  },
  { 
    culturalFact: 'South Africa: Amidst the vast landscapes, "Ubuntu" weaves a philosophy of interconnectedness, inviting each person to recognize their shared humanity and the profound impact of their actions.',
    country: 'South Africa'
  },
  { 
    culturalFact: 'Japan: In the tranquility of "Tea Ceremony," every gesture becomes a meditation, a symphony of mindfulness that honors the tea, the host, and the timeless art of presence.',
    country: 'Japan'
  },
  { 
    culturalFact: 'Spain: Beneath the fervor of "La Tomatina," the streets of Buñol transform into a tomato battlefield, a celebration where ripe tomatoes become projectiles in a joyous and messy spectacle.',
    country: 'Spain'
  },
  { 
    culturalFact: 'Russia: Within the pages of "Russian Nesting Dolls," generations nest like dreams, each doll a symbol of connection and the layers of life that unfold as the smallest doll is revealed.',
    country: 'Russia'
  },
  { 
    culturalFact: 'China: Amidst the tranquil beauty of "Tai Chi," movements flow like whispers of ancient wisdom, a dance that harmonizes body and mind while connecting practitioners with the essence of nature.',
    country: 'China'
  },
  { 
    culturalFact: 'Australia: In the ancient landscapes of the "Aboriginal Dreamtime," creation stories form a cosmic narrative, connecting land, spirits, and humanity in a dance that spans time and place.',
    country: 'Australia'
  },
  { 
    culturalFact: 'Morocco: Among the vibrant "Medina" alleys, artisans craft intricate "Zellige" mosaics, each tile a piece of a grand puzzle that adorns architecture with geometric beauty and cultural history.',
    country: 'Morocco'
  },
  { 
    culturalFact: 'Kenya: In the Maasai Mara, the "Great Migration" paints the savannah with a spectacle of life, as wildebeests and zebras traverse the plains in a timeless journey of survival and renewal.',
    country: 'Kenya'
  },
  { 
    culturalFact: 'Peru: Amidst the Andean peaks, "Inti Raymi" honors the sun god Inti, a ritual that reenacts ancient traditions and the connection between humanity, the cosmos, and the land.',
    country: 'Peru'
  },
  { 
    culturalFact: 'Saudi Arabia: In the heart of Mecca, the "Hajj" pilgrimage becomes a sea of humanity, as millions of Muslims journey to fulfill a sacred duty, transcending borders and uniting in faith.',
    country: 'Saudi Arabia'
  },
  { 
    culturalFact: 'Canada: Amidst the towering totem poles of the First Nations, "Potlatch" emerges as a ceremony of giving, a celebration that weaves community and culture through acts of generosity.',
    country: 'Canada'
  },
  { 
    culturalFact: 'India: In the colorful whirlwind of "Diwali," homes illuminate like stars, celebrating the victory of light over darkness and inviting prosperity, family, and the triumph of good.',
    country: 'India'
  },
  { 
    culturalFact: 'Japan: Amidst the tranquil "Zen Gardens," meticulously raked gravel invites contemplation, each pattern a reflection of inner peace in a world of stillness and carefully arranged harmony.',
    country: 'Japan'
  },
  { 
    culturalFact: 'India: Amidst the vibrant chaos of Indian markets, the "Bargaining Ritual" unfolds, a dance of haggling where sellers and buyers engage in a playful banter that honors tradition and camaraderie.',
    country: 'India'
  },
  { 
    culturalFact: 'Japan: Within the elegance of "Kintsugi," broken pottery becomes art, as golden lacquer fills the cracks, celebrating imperfections and the journey of objects and people alike.',
    country: 'Japan'
  },
  { 
    culturalFact: 'Brazil: Amidst the rhythm of "Forró" music, partners embrace like the ebb and flow of the ocean, a dance that celebrates connection, desire, and the heartbeats of Brazil\'s diverse culture.',
    country: 'Brazil'
  },
  { 
    culturalFact: 'Egypt: In the serenity of the "Felucca" sailboat, Nile waters whisper ancient tales, as travelers embrace the gentle breeze and the timeless journey that links past and present.',
    country: 'Egypt'
  },
  { 
    culturalFact: 'South Korea: Amidst the vibrant lights of "Nanta," kitchen utensils transform into percussion instruments, a theatrical performance that blends humor, rhythm, and the art of culinary chaos.',
    country: 'South Korea'
  },
  { 
    culturalFact: 'Italy: Within the romantic streets of Florence, "Gelato" dances like a frozen sonnet, inviting taste buds to savor the embrace of artisanal flavors that capture the essence of la dolce vita.',
    country: 'Italy'
  },
  { 
    culturalFact: 'Indonesia: Amidst the lush jungles of Bali, the "Nyepi" silence falls, a day of meditation and reflection where the island rests, and locals turn inward to cleanse the soul and renew the spirit.',
    country: 'Indonesia'
  },
  { 
    culturalFact: 'Russia: In the enchanting realm of "Matryoshka" dolls, each nested figure emerges like a secret passage, a journey that uncovers wisdom, nostalgia, and the echoes of generations.',
    country: 'Russia'
  },
  { 
    culturalFact: 'China: Amidst the vast terracotta army, "Emperor Qin\'s Legacy" lives on, a testament to his ambition and the silent guardians who stand watch over his eternal empire.',
    country: 'China'
  },
  { 
    culturalFact: 'Morocco: Within the labyrinths of "Medina," the "Barter Ballet" unfolds, a spirited exchange that transcends language, revealing the vibrant culture of trade, connection, and human interaction.',
    country: 'Morocco'
  },
  { 
    culturalFact: 'New Zealand: Amidst the lush landscapes, "Māori Haka" reverberates like thunder, a fierce dance that embodies identity, unity, and the heartbeat of Aotearoa\'s indigenous culture.',
    country: 'New Zealand'
  },
  { 
    culturalFact: 'Iran: In the ancient heart of Persia, "Nowruz" heralds the new year, a vibrant celebration that weaves spring\'s awakening with ancient Zoroastrian traditions and the promise of renewal.',
    country: 'Iran'
  },
  { 
    culturalFact: 'Peru: Amidst the mystical "Nazca Lines," geoglyphs etch tales of the cosmos, a prehistoric masterpiece that invites contemplation on the connection between humanity and the universe.',
    country: 'Peru'
  },
  { 
    culturalFact: 'Thailand: Within the aroma of "Thai Street Food," vendors create a culinary symphony, a vibrant tapestry of flavors that celebrates the harmony of sweet, sour, spicy, and savory.',
    country: 'Thailand'
  },
  { 
    culturalFact: 'Kenya: In the savannah\'s embrace, "Maasai Jumping" becomes a dance of tradition, where warriors leap like flames, bridging generations and proving strength for the challenges that lie ahead.',
    country: 'Kenya'
  },
  { 
    culturalFact: 'Turkey: Amidst the grandeur of the "Hagia Sophia," history unfolds like a living parchment, a sanctuary that has witnessed empires rise and fall, a testament to Istanbul\'s enduring soul.',
    country: 'Turkey'
  },
  { 
    culturalFact: 'Mexico: Within the labyrinth of "Cenotes," nature\'s cathedrals invite exploration, as crystal-clear waters whisper stories of ancient Mayan rituals and the secrets of the earth.',
    country: 'Mexico'
  },
  { 
    culturalFact: 'Sweden: Amidst the majesty of the "Midsummer Pole," locals gather like blossoms in the sun, dancing, singing, and celebrating the longest day with traditions that honor light and nature.',
    country: 'Sweden'
  },
  { 
    culturalFact: 'Egypt: Within the embrace of the "Nile River," ancient secrets lie beneath the waters, stories of civilization, agriculture, and the river\'s eternal journey, forever shaping the land.',
    country: 'Egypt'
  },
  { 
    culturalFact: 'Argentina: In the rhythm of "Tango," bodies merge like whispers of passion, a dance that tells tales of love, desire, and the bittersweet embrace of Buenos Aires\' enigmatic soul.',
    country: 'Argentina'
  },

];
//Now lets add the cultural facts through code
//CulturalFact.insertMany()
//.then(insertedDocs => {
    //console.log('Documents inserted:', insertedDocs);
  //})
  //.catch(error => {
    //console.error('Error inserting documents:', error);
 // });

const culturalFactSchema = new mongoose.Schema({
  culturalFact: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const CulturalFact = mongoose.model('CulturalFact', culturalFactSchema);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
