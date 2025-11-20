import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { vw, vh } from '../utils/dimensions';
import Image from './Image';
import Title from './Title';

type Item = {
  id: string;
  name: string;
  image: string;
};

type Props = {
  title?: string;
  data: Item[];
};

export default function FourGridCarousel({title, data }: Props) {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleAdd = (id: string) => {
    setQuantities(prev => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : 1,
    }));
  };

  const handleDec = (id: string) => {
    setQuantities(prev => {
      if (!prev[id]) return prev;
      const updated = { ...prev };
      if (updated[id] > 1) updated[id] -= 1;
      else delete updated[id];
      return updated;
    });
  };

  const renderItem = ({ item }: { item: Item }) => {
    const qty = quantities[item.id] || 0;

    return (
      <View style={styles.card}>
        <Image
          source={{
            uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEBUTExIVFhUVFRUWGBYYFxUYGBUYFhcXFxUVFxcaHSggGB0lGxgYITEhJSkrLi4uGCIzODMuNyotLisBCgoKDg0OGxAQGy0mHSUtLS0tLy0wLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAFAAIDBAYBB//EAFIQAAIBAwICBgQHCwcLBAMAAAECEQADIRIxBEEFBhMiUWEycYGRFCMzobHR8BY0QlJTVHKCkrPBByRik7LS8RU1Q2RzdIOiw9PhJUSjwheElP/EABoBAAMBAQEBAAAAAAAAAAAAAAECAwAEBgX/xAAxEQACAgEBBgQFBAIDAAAAAAAAAQIRAxIEEyExQVEiMnHwBRRSYZE0gbHB0eEVQvH/2gAMAwEAAhEDEQA/ANJ0T0YbxuHtrghtDEO7DDHUtskKUIYQd1Kkb8iH3NDHx92BBHenUQ2om6Di5JxndQAdq71UMregEDtWwdUtme17344IOO74Udr5zPrSlKwD9zfjfuydzqMjOo9mTJSSADkypIM4IQ6tYg37pAmO9lpJJ7Tlc305GwAM0ertawapdzPnq0Zn4RdlsN3jCgsGPZZlMiBmNODOI63VkER296OUNlpOo9pOH5DI9HBnEH4pVrNrl3ALdWycm/ckzPeaFk6j2QJJTbTv6Mg71wdWeXwi7AyO9liWLHtOVwZAgjIwZFH4pRRNrl3AH3NmZ+EXZIIPeOlQxDHshukRAz6JgzSfqwDj4ReA3kN3mJIJ7Qn0wNIgEbEjIgA326wDqWC2gGRlpK6R56gRHiDS7ddWjUNRJGnnIXXEeOkgx4GtQu9fcCnq3OTfuSZmGMJJk9kCSU8Bn0SRtiufczgqeIvaZJ9I6iWMnW2zgYgEYEjIgDQAUy3cDFlBkoQrAbqSquAf1WU+2sHePuAvubM6vhFwEyCATpUFgxFoTKREDO2CCKTdWAQV+EXgsHIfvGSCS7H04gROwkZEQeZgIkgSYE8zBMDxMA+6ozxKDX31+L9PI7ndDjV+L3WVs8mB51qBvWuoGPVwmSb9zUZBgnSobc21nuMORG20QYrh6syCvwi9pJJkMdZLGTqbZgIwCDEkTECjtq4GBKmQGZT5MpKsPWCCKkisHePuZ49WzOrt7gJkEAnQoYiezWe4QBCkHG2RIrlzquCCvwi+AZMh++S0ek0d4CMAgxLciAND9vdvTLlxVjUwGohVkgamMwonc4OKxt411Ab9XJkm/ckyIBOlQfyaknQwGxBx6sVz7mdweIv6SSZDkPJgEF+aiJAIJBJzGKPFgJkjG+dp2nw2NOisZZH3M+erZnV29wNkQCdADQDoQEaCAJBBEHyxSbqwCCvwi+AZMh4eTAy/MCJAOxZuRgH6VYKnLuAT1dO/b3JyIBIRQcSqfgsBkERDco7tN+5ncfCL2kktOoh5MY1c1ESAQSCTmMVoIpULMpSAJ6umdXb3Ac92fiwCCuE/BIGQQRDeWK5c6sggjt74BkkhzrkiI1/i7mORMjnJ+uVrNqkAfucO/b3JyAASECxpBC/gsBkFYhsgAYql0t0X8Ht6u1vMpcajrYMuw9NAW04JC6T3iMqCa1cUF62/ex7uvvJ8XDHXLCB3O9vG2/PFYMZPUkB/8jv4j9vh/wDsUqt/CU/On/aT+7Xa1sGss9VDIvE5PavJz3e8xNrvQTpJOR3TMg5NHqA9U403iNu2bEkyZzck7ahpMDG5G9HqzNPzMVKlXaAoqVRcTfW2jXHMKiszHwCgkn3ChF3pXiLdn4RcsW1sga3UXGN63biS7DToZlXJQHkYY7UyjYG6DlKhFvpW4XZQgJJKoIcQwYjv6oDDQDdlT6IjJK6n9Yukbli2jWba3He6lsKzFQdSucEAwe7A9dNpYE7IeI6Nd7lxcLbg3bT90xxFwATp3GhlZ55m/HKnJwDP2LXUgm5du3VDDul7bKiEqe+FGhMSDomqHHdbYHDmxbD9sLL3NTaTZt3rqWVkDJfWxEf0G8Kv9NdNmxcCrbDpbUXeIaYNmyW0hgObYdo/FttziXtk3jRDe4C7BBV3AtuloC9pNthduFHZy4Jm2bI195l7M4kmX3Oj72q4T3w11WIXSO0A4axa16S6DDo/dJHI8hS6x9Otw0lUVwOF4niMk5NjQVUR+CQ+9S8bxvE2LZvOlh7aDW4Q3A4QZZl1SGIGYxMHNa2LoRYfhHPDBCS1xQrKWiddtg9sEiRggAmTIGSZmqqdHXJQ6QBdIfiRqEqyObyBSPT7zdkT+Kq8qXS3TptXAqIHt20F7iHkjsrTNpVl8WwzkHZLZOJEmwKFtBcEwNZ6OdTrEq54q+5bVI7JzeKyswRLIdMb5iZqvY4G+LTBlbXpthgWUrcYOpd1IuySAGjV2YbVDAgQLPS3TPYXgrLKfBr98xJctauWEW2o2OrtY9cZpt/pDiLKi7ft2uzlQ4RnL2QzBdRJGm4ASC0BYAJGqKNsGhDeD4Fw1p7lssUe8ANSTbR3RrbenGldJkAsRIABG0vSfA3LzEB0RBbKqzKX77kE3VVXWCmlYJ3Jbbmvht+61zsEtBLbtb1XWf410w4XQO4obu6zJkHuxBNe10+W0to0p3luBg7Mr27j274DqNIFspJn0wwiDE7jdh0quI3i+jXujiC1kB79i2MOukXFDBk3mJ0wYiN4zUvGcPda6rJbZQpsQdS4QP8AGq3xsA6CwhVYERknCluGLFAXXSxzp5rOQrQSCwETGJmMUH6U6ba1eIVFNm1oPE3CSOy7Uxb0xgxhnnZWBoWzaEGzSrP3eO40cQliOEl7Vy6G+PgC29tCpEySTcHhtT+l+N4uyFYDhSGezbg9sTqusiFpx3QzHETA8aXSVTDtKs9x3S/EWTpNu1cZFN6/2ZuQlgHSCoMk3SdZA2ItNtij6MCAQQQQCCNiDsR5UrjQU7O0q7XKARUD63gfBiT3e8PjIJ7OTBML3sgkYGZzAo5QTrcP5qZGoBklO8NfeGlZUhh3owNxI51kNDzIi+GXfyK/19v+7Spvb2/zs/1tn6qVAlfvgP6p/wCmnJ7Vu9LEAami0NQEaDOB3YII3o/QDqkwK3o2F5xzMmZNyT+MCDAxzG8A+KZlZ+ZnaVKlQFIeL4dbtt7b5V1ZGHkwgx7DQe/0XxVyweGuXrRtsvZ3LoRxduWiNLLonSjssguCYmQtHxXYp06FYL43gLjsHDDumFTUyqbekypuKNSEvpcxv2SL4mu8X0a7pwwNzU1m9ZuM7CDc7NWDGBgFifUJ95QCpLdsnajbYjpGafqsgW8LRCte4mzxBkYAtXbd02x4Albh8jc8qscN1fzce5dum5ednuaLjIhxpRAOYVAqSd4JgTFH+xPh9FJrZG4pqkDWu5j+L6pu1jsVurpXhuK4W2WDStu9o7EMeegLpPiAD4gEeO4Lir9prLGwiONLspus2giHVQyqAWWRqO0zB2rQC0fA0tB8D7qPEGpdzPcF1bADm5dul7rFrgS4yJkBVthRHdVAqAnJAk5NX+heBaxZFotrFuVRs6uzB+LVvFlWFnnpB3MUS0eVLQfD5qDTZrQD6Y6DHEXAzMQvwa/YIHpA3bll1uKdpU2ufMjwqLiOiuJvILN+9aNuVNw20cPfCkNpILFbQYgao1SJAiZGg0+VLT5fNR4mtAJej+ItPc7C5a7O67XAt1Wm075fSVI1qTLaTEEkTBwrPQjLYFkXTvduPcganv3GL9poOABcY3As4KoNgZPdmfA+4002z4H3VuJrQO6O4V7aNJBJMqup2VIVV0h37xBZSxJGNR33I7hurFsW3F17rtdZ3vEXbqJce5h4thoVYhQvJVArQhD4V02W/FNLUuwVJLqZ/gOh7iXbLvdD9jYvWJghnV7lprbNy1Bbek+JzzgW+l+BN5FUMFK3bNzOZ7K6rlceIWKJdmfCl2LeH0Vql2CpLuAuH6BGq5cuXLhuXX1Mbd27bUAd22gCsJCpAk7mTAmKsdC9H/B7XYhtVtCRamdSW/wbbE+lpyAfCPCSSdCDBptK2x0KlSpUgxygXW/72wdJ1LFzvjs85MoNWRIgbkxzo9QPrcwHCsSNQ1JKd7vywAErneMDfasNDzL1IYb8ja99n+5SqPtF/PD+3a/7dKgJRP1VM9sSdR7Vsyx0jUxFqW5qScDu5wYNH6AdUgNN4jbtm5sZMk9pLcmBUwMbkYMA/TDT8zFXaVdAoiiApwFICnCsLZwCpLBhj+j/ABFNio+Iu6NLHbUqnyDnSD+0VqkODsnNWqLWuOdN4m4CNx7xVZ751aACGJwPESe95CBOfEeNSXVZCNYGdoz7PGatvX2ObQu5d4S5K7/PTLxM7/RVE3VBjWN4kDnznEVIwXmFyP6P+BHnNNrNpJ1uHx+irSMaGtZQekgEmBhTmuCyozIIEzCiT4Rp5eUTW1/Y2j7hcGuE0Mwcd2fCdvZg1EETmykCdjJ8QMeArazaQlcuHxqpfc+Pz1QKoOWPFgq+zM08m2P9Gp9Wkn3Vt4bdl3hWNWuIcadx76y9zjyqtpCKSYGkDAnDY+jx5+EvC8arDvZYQD34nE+w+7f2nazaGF2vqN2HvFcXiUOzr76G2ONm4w0kKu5gZBHd06R3ucwcEZqe/wAZpRn78DyeSOeD4A+B2NbeG3Zb4k972D6KhIqDou+bllbjCDclwPBWJKD9mKsmuWTt2dcOCoZSrpFcpCgqB9bfveZ0kMIud4dnJgmVGoSpIwM0coH1vH81OJGpZTvDX3gFUFCG9KMDcYoDw8yIPhJ/IN/WcP8AXXaZ2lr89P8AXW6VAnZP1Vn46cntWgyW0rqaLUnbSZ7owNxvR6s/1PeVvRsLzjcks0y1ySBAaQwWIE4JERoRTDz8zOinCuCnCiTbOinAVwCngU6QrEBTOK4cXLbIcB1KzzEjceY39lSqKeBTpE2zO9G3bvaFLhQ3VaXCsVkFdKMMEhWVMRJGZzRjj7+ogEQAZxLE8thnY1lr7KvH8QezDHWk4GALSRuInkKNWeNBUg22MCYkkNvgEgH5vHnQcuasXR1K62na6zd2ANRQ9pPeJ72wkmDjbG2ZDeL44Mykg4gQFbvjPdABMezOPKanvMd17pGAArMN/wAIyMeW/PFUeLtl5LpMkbCYgZnvSR4EiTHmI2pdwpfYe90NcLOt4QJWIhF9ALH4JOcrmPwuVaFOIszuxIMZ17yRPhyPlWYtcPpOpGZTndSwUbwFg4MwQMiAfEnr68xrgxgheZJB9LEFojwGedMppLmK42wlcNtTCJ3QSAEnVswLauUkjeDgmarcKzqXPYmSxCnUCV2PZxpKg6Ygn8bnXVvEGQGJI3MAAD8GNJ2xGcyfCmvxTk5tyLiIrDaMtnGQQWB32XEmhr48w6OA0u91VDEgh98SyzsdLd0HAIkzHnTeH4422CqqsDc77Zfu9490LAABMAAQNswStfQ8SqZ0kPsQ0gatIYd6dtgPIZlnEjiGZZ0aQUaO8TKkEYiBERM5n3BzQygc4sFLrK0TGqJxlQSCeQ1Bh45qKyxkRyjfAIKtDHMwQwbEtiMTjvE8MzAfFGYYOVjv5GSebHOdzGcinW+Dual0gqZCaiqlVH4THx8T4gb7ihrQ27Ch4oiG/BbCDKnYQzEd4nYwIAXxOzeNU3vilgM4YMdT6kQFNZknwcADmWHIE1XvWGuAs/cL7gqWgQSB5nBEzOV5xPOinnjVBJZhZuAsRBjUmNhAkTHqNM5rkJGD5mjVAAABAAAA8ANhXDUhFNNTaKojNcp5pppR0NoH1uB+DYOltSxcll7PIk6llhKyIG+3OjlA+uLRwrEiV1JqWSC8sAApAJBmNgSdsb0B4eZEWv8A1Yf/AAfVSqDtf9dHu4elSUT4lvqoSReJOo9qwmWYKNTEWpbYrJEDGcYij4rP9UIK3oPd7d9yWJYMdTydg2Dp5ZgwRWhFUHyeZnRTgK4BTwKZEmdAp4FcFPAp0I2dUU8CuAU4CnRNswvFNHSPE+u389m3RnhnxQXjTHSfE+u1+5t+dGuD2/w9+9ceTzMsvKh7n1VEzfb/AAoLx3W61acoykEfpkc42U+X1jnTPXawfwT7rnu9Dx+bO+KXSzrjsW0SVqDo0Or1fPS11nD10s/in3P4fo58PVn+jS+7Sz+Kfdcx4fg+z7RW0sb5DaPoZo9dLX6qzn3Z2fxT7n/u/X452CPXOz+Kfdc+jT9vPltLN8htH0M0halqrN/dnY/FPufPuX7efJfdpZ/FPucf/THz58RkbSzfIbR9DNOp+311Mp9VZUdd7H4p91zx/R8PnHnNEOhus9viLgtouYknveP9IAeH0eBO0sSex54R1Sg0grxT0L6Eeekv/wBe6f8AntUU40/bH10I6vH/ANTP+7Xf3lmmx+ZHM+RsTTDUpFMNdDQqZGaaaeaaaRjoYaB9bvveQdDBhpuSwCTgmV7wkEjAk0dIoD1x+9WLZUMupQSpYahpAYZHejkSRIxvQK4/Miv8Ib82/wCez9ddrur/AFpv2rX1UqQn76EnVKfjtWSLrAEFiFWW02pIEFMjSMCRGCK0QrOdTmBW/pOO3cbliWB77kkCNUg6dhyMEAaNadD5PMxwp4pop4p0RY4CpAKatPFOibHAU6K4KcKokTZ5/wBI/wCc+J/4X7lKNcF9vfWK679IcRY4/irtrRpQWdWoSZNlY3IkY5GRvEZrb8IPL7TXDmTU2du6ccUZ9GeW9Zvvp/Z7Of8AH5/ZVvofodLlgltXaX9QsEBiqm1JLOwEKrv8XnwMeVTrN983PZ9oqez1nuKioFICqigB1iEMjHZc+eTOAZAiqwq+J6mcc8tlxrDz4X79QJ6wQeYOCI3BHjSqXi7/AGlxnIguxaMbnJ2AG+dhvV3q7bVr2SvdBIBIEtIC7nO/vipTlpi2d88mjHqlzrl9yTh+gLrLqYi2CCcgk43MD658qZx3QzoNS98Ad6NwQYYgb6efP3Zrc8fesiyU1qouXEfSWWbZAAcA6jKkeo55g4ms8RYfh4VlBWMKUJcgQNTscKJ2GwI5mK5lPLqq+NXR57/ldo3ilXgs8tpVb6WtKl5gpBXBEEQJ3AjzmqZNdUXqVnpITUop9ztaXqD99/q/x+b/AM+0ZkGtL1C++/1ft/DP8Jhjm+I/pZ+hvuOA+0UJ6t/50P8Au1397Zq/09eZLNx1HeVGYSCRIBIkTms5/J/xHEP0pcF9QCvDXAYAEN2lhisgkEwR76nhTuzxu6bxSna4fk9KaoyKlNMNdbOdERppp5ppqbKIYaAdcCRw0qdLal0vLKEzkllBIxjAknFHzQDrm4HCMzQU1JqUkrqlgANYyufDJ2xuFK4/OvUq9h/qqe6x/dpVLB/OT+za+qlSAJeqjT20mT2hEg6gqgtotE7BlkgryxuNJrQis51PIK3yp7vbOMsWJYE6mkjAOCF5EnMRWjFObJ5mOWpBUYqRaoiTOs4UEkgACSTyA3Nd7UYIMg+FcdAQQRIOCPHkax1m63C3G4W58kyk2Xk+gO6VJjdRjcmADzoZJ6FYkY6nRuEaafNC+ieL1WxO47resfXg+2iF04n1VTHkUo6kTlGnR5f1x4Lt+L4y2NJZ/g+mYJDG0saZ9GVV5IyQI2rYcE4O23s5EyNt8Vnel7gXj75LFRr4fU3d+LAt2iGOxIJ7uDuwxEmtHwVrE946swRkZOD7IA22rlzW5Ha5PdRi+X/h5b1l++n9nh4eWPt4zU3QfHcPZtsLutzeJS4FVTotAEaZZhBLNrlZPcT1GHrN99P7Pt9vChVOnTPXwwLPssIybSpcg6l/hl4duFLu3aB2a8qDR2uOxYEkXAFChSAsHtH9dFP8tWSD2rA9xx2Vm7xBtsTZuJpNu5aUW1kiCpaGI5SazfRfE2bZY3rRuAgQBpERM5JxOMgE45Vft9I8IO6eCPdCAEwWYj5TWC3dmJEFiM8qdS9D520bEtTi1N9btc3zCHBdN8Nb4cBLehlQxbVnnVo44AC9pkEm7b70Y1eVN47irHEIhu/IkIdUm5fS9bZmuWnJgkXLZdEfAwm0RVEdJcIIJ4Nsxzwc5IJOREgCIkTjYQWuN4dbcHg9VzSBrZmCkzqJjOnusMjJxtAJOr0IrY1q1RjNNvuv8hHpbpLh+IQ2tRtlSrJc0DstUxdA09/QVaFBUQLKbbGbh+leFa7bKs9nsRcS21xQB2b2HRRNvUSRcCvJzNx9+QscXYVUjhG0gQzuss/cIDA4UEtDRtggHwHcZcRnLW0KKY7hOrSYyAeYnPtis5vmdGLYITWjxJca4rrwf5LnTF/UlpWureur2mu6uqCrFSlvU6qzxDHIxqgUS6gH+d/q/QdvXufHHrFZqtJ1C++/1f47fx9njvNuzs2vEsWxTin7s2nWN44e6YmLb4x4bUI6i/5yvGGA0XfSnVn4IYaTMiY8hAkxgx1mAHD3jnFtz7l88Vn/AOT/AI63d6VvFJM2LjaiACRq4Vc891O87zJ5bAeWjF/Lyde7R6W1RtUjUw1ZnEiM0w080w1NlUNNAetxjh5DaWDDS5OkISQCS49HBxzJiMxR40A65wOEYt6AZNQDFWYagAFYZXvRymJiDmlK4/MiCR+a3P2bP9+u0zQPzg/8tKpiWWOqRPx2rftDGdQVJYJbnkVggry9RFHzWe6muCt/SZAvuDnUS4PfblAO4XMeJERoWGKoNk8zIO3IwK4vG98ITBPo/wBLfA8dj9hQrprh37rozAoZhTGsfhIZBBkDmDWesdMMw7w1oDyPftQZGTvAnMGY8KjLI4mUNR6DY4xWYpI1KASs5AOxjwoX1r6PFy1MDXbIdDzDDIGxJB2gbzQDjb5cJftt8bbByMF1zI9cT4jf1UcucT8K4ZuzJBIjG6tjHsMY8op96pRom8bi0yp0BxyhiC0BlQiTznSBvvJj2VoeK4sLbZ9wqkmPITXnfGFrQOsaezZWIJjJZYAI5agCI5bZBrSJxM9qu4uW9QyRB9ExGxyPVXHjzPGtJbLi1PUZfp8i7fuat2XhrsTAMW0Ld0GXkBowQOzfYit1ZULC+CjmN4k7Y9tYXjOA1XeDvSFK2HDSs9y3AGAcYuE74jyrb8Pc1ktkTBiRgch7K65O+Jsnkik/fI8s6zffVz2ePhHPPv8AoihVFes33y/s+ihVMe12T9PD0Q625UhgYIIII5EGQc0QHT/EySLxBIAMLbyFLFR6PLU0eE+VDaKdWOBS/wAXbt3J7Mh2eCQdKIzbjIyAJ862rSrF2lYoweTJFOkW7X+UeJtyqXLluQJFu2ASpEEHSCYIGRgaY8ai6V4zjrfxXEF01jVpdLUOOZwCDnceJzuK3F7iwmlezWFRSqyoS2pOgKqkQAuMjJ8zANLpO2t+01tlUekF2YW2iQ9s/g43AiQa4n8Qp8uHc+Bi25PIlLHGvTijE3OmuIYMGvEhxpcEIdS5kEaY/CaYyZ3qhTrtsqxVtwSD6wYNNrtu0ekxwhFeBJegq0vUH77n+h9JH/j/ABis1Wk6hH+d/q/x+bff65BOf4j+ln6Gz60t/Nb/APsbn9k+dZ7+TjhkTpBSoIL8A7mec3OGzuR6WvaMRjx0XTpQjsnYKLqspY7RsQI/CPIUH6kcKtvpFQsKPgN2FHMG9w5Fw49IzBnMjmM0MEk5UeR11s8oWeitUZp7Uw10s4kRmmGnmmGpMqhpoD1vYjh5U6X1DS8lQpmWJcA6RAPmdhmjxrP9dLgXhGLHuBk1DVpJGoQA0GDMcjPKDmlK4/Mit2C/mn/LY+qlTpb86/5bf96u1OwU+xJ1Wu/LFjJ7Qgd7UFSWKW/AMskEbjHKKLX+MC7sq/pEAHx3j5qEdUSNN+DK9vcGTJ1hiHMgCFmIGSJOdq50v0hwD9252dwqSPRDaSN+9y25GjKVIaUbmznF9JqxNsN2dzkG2bwKGYceoz7azXEcZ2V740Ec8EaT4ny28KodKtwE/Eu67d0kNb2B9EnHs9dQpfRl0vc1iO4T6QYDAnJK+Rz5iuKWS3ReMEkHD07ZUhTaADDEHDbefq+bwq/0f0hZKkAQsxiQyjlqB3+wjxxOi2yi2YAB355jwzynYc6JcGmgqq8RauSAFOsagZHxTqSCyk5BwZHKZqatchpQVcTSdP29dgox1kgdkw1HXkP2ZYbEwCJO8AHOY+hr89gxzpbsmPlcUaT5SQDHnHkVpHZyCRaYjUshuyfJW4p5qW2I3b11B0U/xrWwpLJc0uFE5Gxxya3c1znKnyAE7a4CRrS0M6QBWxo7q3EXiwA2InQikAHYkrG86QZJBNbDgz5nlzrN9YOi+Na7fuWbCupthLUuAYIc3ME7htEARMnJ2rScIfq/hmR9orukmoojNpwVNHn3WboS8bj3VUMmPRMt5ykA+4Hx8azVex20MYJPltg6WzGSY8MQRA51i+sPVRy7XbLBzcuEtbYqrIGkgyWyOXnSxzK6Z9z4d8TVbvLSS5P/ACZCr3QnHmxfS5yB0tzlGw4jnj5wKsp1X4wtA4cx+Nrt6OWdWrzBjc+FFbHUDiD6d2ynkCzmcGI7o286s0pKj6Ofbdl0uM5qn+/8BZeIW6CbbdpEeiwOYxK7jGYiMnxqhxvEGwjOSNUAIhYMZPd1ED+iTiZ5mIEv/wDx7fXNvi7ZbY4uW/ZIJn3UD6T6q8XYlntFhuXtntAB4mO8PaK4obDpfO0fJwYtknkVZFX4b/IGZiSSTJJknxJ51yuA12u49IhVpOoJ/nf6v8ft7vCazdaTqD99/q/x+3u9hxyfEf0s/Q23Tt3s7bXZk21do/GESV9sD3ZxIIPqRdDdJKwkA8BcIWAIBu8OQQABIyUnPye+9Gus6luGvBck2rgA3J7pwBGazP8AJs5PSAU23Ts+CuKdeo6j21gyNWQP6IwOXOhs6SZ5LTezSl2Z6k1RtT2NRtXSziQ00w040w1NlENNAutxjh5DaXDDS5Yqqk4JZhtgmOc7Zo6aAdcyPgjEmEDLrg6WjUI0sQQMxONiYpSuNeNFfWv5q37Nv+9Sqbsbn5f/AJRSpBa98BdUmJ7bVv2hAgggWwWCJgAalgqQe8IjbTRi90dZcy9m2x8WRWPvI8qD9UWBW9BJAv3AZMkuCdZxspOwMkeO1aEU42RVJkFvgLY2toPUijz8KsGwhUqVBB3BAIPrropwopIkzNdPdBWwrO3etQQUY9+3q9I2nOWGxNttQ7oiIFebcX0RdHFBLXxodcOcFU2YO3MAwN59FlgmvXesfD67HpRoYNH40YC42MkQfECsTfPZ8MZRyzsbICiTHecnwUcpmKWaQ2OTXUZbuXLdp3V0fSPjNB1E6T3nZPXnUBgHkBjX9VuOW9woNoKpTuso2jkR5R9HlXm/RPD3F4hblq0yG2CWMjSwA9EqCZB2351qujlThLjrbsMbL57jR8Xch1AXlpmPYalHwvkNPxI2a3ZQKdzIxEjwPnHhTXsEDU0TsSOfn68GsPw3SjrxBW07tbwQGBBG8qeRjka23C8cLqFT6UY84z/CqKSmmmRlBwBKmX06p8u7A5yANswZ9WOVR3OKG+858u9BKkTg5HPcHYCKa0uWClSARMlmAaJg2wNpOr8EkZql0m7usrpkaipLd5pAYqQYg5wBM58c8DVSLxVsLPx89zUAwAPc5CTqgkROdj4zBplvilnA07wRlcQOXjggc4IxNZZOLMEaoDZ8d53nOKmF9gIDmfEn1j+Jq29KfLmpPEQR3lKkwTJXTnMryOMHHPzNW/ho1hAVltUd4ZYBiSActgciYkzEViDfYMuQdh54EAe7b21Yu9KXQANZIyYiRsREeGefgPCisyFlszZD196EtrbHEoAj6lW4vJ9cQ+MBwYBjcGaxFbDpLheI4pIFy3lgxDsFLHZSQFPPxySvqNZPi7DWrjW3jWhggGeUyPERmarCakel+FZKw7uUra/gjrR9Qh/O/wBX+I+r7GKzlaPqH99/q/xA/j8/jFOdPxH9LP0PQuOGPt7KEdW/85n/AHa7+8s0W4xcf40I6uj/ANSP+7Xf3lmlx+ZHin5TaNTCa6TTSa6WIhpNMNONNNTZRDTQLrc5HDyp0vqXQxOlVIMksxBAEA5IJ8M0cNAuuLAcIxYnRqTVBCsRqEaWIIGfI42g5oFMfmRU+Dp+ZH9lPqrlTdnd/K//ABj+9XaSxafYk6qn5ad+0MQQQEk6FOnAYDBB7wgA4C0fFZ7ql6N+CSO3eZMnWGIcjAhTggGSCSNorQCmHmvEx4pwNMBpwNMibBPWS9CoviSf2YA/tH3VmuOIa3ZSY1tcb+yo+ip+uHTAVoGQO7PnOT78eygPTnGR8GIO1lX8jLvP0CllJIyi2aXo7gtKkEbsPcM70U4W2GCrGNTp7A50+4FazL9Y1a2NMqyrsYzvmi/V3pE3+GF3bU7TtPd0jH7NBNNiyi1zKvSXVh+0ZkchZUaQdJPNjq8/m07GaM9F8BoI13J0nUpnMA7E+REc66Lic8z4+3aPtt4UV4J1KkiJzSxxpO7BLJJriZW+V1HUATIjnAY+jJB1AkM0ETII3FQ8Qg0aSuoMGnULecnJDiWURHidMjwq4Layq62DPq0rqsAvpEsFVnBYCPDlyqJbCAQCYjBB0znUD3SIIJJBGxOIGKhLC+bHhli+EWB+J6Fts0LcNo5YQSQykLzciGDHY7gbjJEY6GeMXxBBMskSAJJDAgSAQCPHVsBRs2Fxnbn3SfDJInwJ8SonGClsLtrfcHLTkbH1jcHxjkAAuh9yyysEjotgDN6DywIPo59OIgg7zkVKnRts5d2OkjUCNIjE7xjfMwQTzWiFuwq5BggzICg+owACM89z5QB0WEAgCBGmAZEbEQxIOCR7TW3b7h3rAXSVji+1tWeCItF7d5mvXEDAFBiyZBFssJ7wGY7ogSbPCdK8ZaskcZaniFDYttbbtEBA7U6NQQZM7SQMZwa4e4lsli5UR3mLqqiBuxYwRykyRO8YrO9J9KWl47tbzA22sIbbIFugiVIcSD3TlgRnblXS4qWJRpc+YNnx68z5uldd/sCOL4V3uMx4J0k50FhGByI0jcHAHz0R6ncObfGQeamJEHG6sN1Yasjz8DIt2uO4cMw03ZUa2Is2sJp+UZimQdMYknHgQGdD9J2Vu3HQuwuPbFpAg7V30KHRFwAOUmPpoU49Uz6uXacksMoONKvv/dm3vrI/8mqvRvRnZ3zdJ75QoEzhSVYmeZlR5Dxk4I8Pb0oNcBjuAy45lZ9W/t5UxzuWc6RiFkRHODsPKKvjx6eLPNynfBE4ciBBk77wsev18qnJqkt4ZzPj4eMR7snxqZbk88+qB5Qef+NWasEZuJKaaarcbxgtAM/yZIGsbJOBrHIEmJE+cDNWGrnZ0xd8jlBOthPweVMPrXSSQqgzBLMe6MGROZAiTFGqBdcT/NG1To1Lrg6WIkQFJBiWgHEwTGaBWC8SINFv80b+r/8ANKn/AAd/yp/qz9ddpLE4HeqjGL2rcXDAlSBbki2O7gEQRB7w0wcRR8+PKstwHEmwjgGS7tcJI2Lbx5eE7bZiag4vjyQS74G5ZoUeskwKokGclq4BfpTrGloHSpc+5ffuawHTXXbii0C4UEYVBp+ff56McdZuaZFlmnIIZM+clhWO6V6I4m42Ut2h53FZv2R/hWaFjzL/AED0t8KS4lzLoQROZVhv7GB/aFE+muB7Sxw7D8FXterQwZR7mNZToLo5rHFqz9oQUca8FJIBA1LgGRsfCtf0Vxi3Q9gsAdaXLZOAWAIZZ5SpPuFZ0Z3ZlLj3LLaXU6Dt5eo16N/J7dt/BdJOGuPp9eCR89Uumui1dNJjUBMc+XIfbNUOC6MvW+EVU9Jb7vg5A0xGOc1PgnaHb1Rpnod3gB4V3huGKsI8aG9XelXa2FvjvDE+I86J3ekLaiS4+n3Dn6qp4eZz1K6PNeK6yW1vAtaBuWGuKjFTIOpgcC4A2ZiRj11WPWkAxnkOW20/xraPb4VmJSzbulmbIRd5kliefPnvVniejLQA/m9qI/EXGc8vt9DeCXCxFHd265mB+6sefrxXfunHjW5t8Nwy/wChsg+a2/41SuWOHnFqz+yn1U/yyNv/ALGU+6ceNcPWceP0Vr7S8PsbFn9hPqpzWeF/I2P2UrfLruHf/YxN7rNIIBX9ZdSzylZGr1SKr8d0ml5Idu8J0uAAVBzpA5j7eM7S9a4Y/wCjs+5KtcLwnClR8TZOPxUo7jhVjQ2lwlqjzPORxEgobii3GFAbu8wRmSfWTPPyN8BxVvQAiKTaKuJmdW2sOsMreYPONq1V/o/hpxYt/sD6qhu9G2SrBLSIxEBgsewxyPOkezVxRaW3yyVGfIDjr49r07LNkd6VJxywEkeRBpz/AMqNrduHuk/qCfnrKdMzaco4KnlIj1f+PEZFBHyfGkUpdQvHj6Hoqfyn2dl4S76tdr6qevX+43yXCgeb3S3vCqPLnyrz7h7UUSTjVQeH2+ag5y6GWKHYN9MdL8VxYFp7pHaOltUtgIoNxwskZYwGPPxr1pzk15p/J70O968OMuKVtW5NmQR2jsCO0g/gqpMHmTI2r0mi7riClfAVBetbEWO6YfUugyFAM94lm7oAUE58MZo1QPrg4HCMWJCSuoggMBqHolsDPM7ee1AeHmRU7Gz+bH+rrlTfGflbfuP/AHaVIT/YFWLnEXMW+E1EEA/HqYx/REzMqVMEECdwaZ0n0LxV23cTsIV0Kag4uYcaX7ikxg4Pj6qudAdM2bAuq7llNw3HI3Qu5B1EQNOqAACx7xGwkmD1s4eR3jLR2fdJNzU+iV5gawRnGPDNV/cMsc4ypR4ehi+gOrPGcKIsm+QN0uw1sgiO6hgiGJJ9HExqqt0l0MUuL2txrbuWMFrY0sx1bMCI2A0scLt47i51o4cgnU0CA+J7OTpGojBl8YnfwBNUuk+P4DikVb5dhJNow6ljJtsUCkMMyuZB5Tmkab6jRjPrEy/C9EKoYi9cJ8NSQ0yTuN9MYaIloxinWui7OltQC6eerUIclUuSYUgEeXo5A5k7fDdGLgG6CvygJ1hJcKZ1yB8ZA7mTmJohwHSPA2DqUmHwhKzrGor3VVd9cjblzqThO+LKV2izPXug2tFXduMjXDaSDqBOoMCqyBplYydsirfBfF6QjFix0sTc15kCVBjGoMIaMkSYrTXOsvCspV5IGLqxOkagneIwe+VGCTJxthlnrBwQjcg/J6l1azqKdwGWHeBAxmcTTPFfUXx/SwWWLHBbQGkMCvfBwukDmGEQ0ZMEQZqG1aEgsILSGBR3kBQqRcAODpliPIhsCdA/Wvh2lTkie0UrISGCMW5N3iFxM8pqkemeDAXUZTVNo6XJLhgraY3IJVYgSfE6qDxPowLX9LBqdGoHCLbCLuG0soDaoKnSwBx3YMQRPMajljoy+U0khrZjD4bSRDBjGZE5PIxykwWenOGS6z62DKum4mkRbAfSSxXB7xC4ny51YudaOEYd5mCk91hq7xRoYLHeMNA8DtnNaGLrIEtfSL/AMtdRbR9KzbGBsSRPPBEx7af9wdj8mvuq+nWfh1dwXuEgkuhj4mCtsidoDHYEySYnlK3W/hANRdghBKtpJD6TpbSBnBgeZ2mDHSpNEdzJ/wDUFHqHY/JrTfuCsfk1ow3WrhwGBLB0kusSUCGHJIwQDGBmTG5io1618KBJdtOQHIw5Uwygb4JAmIkxMzR1s25l9LBR6iWfya+6o/uFs/iJ4bD3UbfrVw4Yp3tazrSMoFYK5J2gTG+eUmKZd62cKo1a2CZAbS0MVjWqwJkEryyTG4MbWzbmf0sFjqLbH4AFL7iU2Aj3xRZ+tNgSDOpNRdIkoqGGYlTGMe3G9OHXDhQJLnRkC5pMFlgsANzGpcgRmJnFDX9zbmX0mZ4/qKx2CsD9vGaznFfye8WDNtUI8y8+8V6S/WrhwSpL9oJ1JpEqFjU5k6QApBiecelimv1u4UAtrOjI1FW0llALrtMgMuc7xuDGsZQydEzzi1/J7xzb9ivqNwxRroT+TVkuLcvOLhUyEgBJ5alJJYeRx5Vrb/T3CuYfUHTUSsQQoguzRgCFBiZxp3JU1h0pwIBPaXAhBXXqcAlQoZRmcAqcCJJ57bgDRk7M0HDcMwGWn7bVObVZ270vwusjU4uAsWUagQFGpiSIAAWWIJ3J5mKY/S3AhSTcbR3lLE3CCQuVI5nSfVtzrUjaMnY0TW/8IJ+igPW2ewxIcOunVCLMjvMX7uAZE8xjMU1umeE0vbJeSrh0JYtoCNqYme4NBLePL0jFCOO4zhfga8NZcrZU6dZJEaT2hUFlMnvbgQoPqFK0h8ay7xWuBf7O1+an+pP10qqf5Q/pn/8AnvfXSqfEpupdn+C+Pll/2L/9Kq/FfJcR/trn/wBKVKsTfv8ABPxXy9n9G/8AQtRcR8hxP6V792K5SrID/v8Aolt/K2v9i39m1UN/5Pi/Xd/d26VKsP199ibi/lbH/E/cimv8hxP/ABvoFKlWXMEufvsSXvSs/oH92Kgvf+6/U/dpSpURuvvsPvfKcP8Aot+7anN6HFetv3a0qVAR+/wNs78N+h/07VJv/c+sfu0pUqyCunvoPu7cN+n/ANJ6afQ4n9I/QKVKt0F7e+g2z/7b9T90Kc3pcT+p/ZalSrBXT9jlzbh/Wv7u5UifKXvWPprtKixv9fwVuF9DhfV/01qwvyl79T6HpUqAi6DLPyfDetPoNOs+le/ST+NKlTA/1/ZFY+R4b/hfRUn+lvf7MfTdpUqBSPJDV+S4b12PoNTcL8rd/Rtf2mpUqDNLoY2lSpVQB//Z',
          }}
          style={styles.image}
        />

        <Text numberOfLines={2} style={styles.name}>
          {item.name}
        </Text>

        {/* PINNED BOTTOM SECTION */}
        <View style={styles.bottomSection}>
          {qty === 0 ? (
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => handleAdd(item.id)}
            >
              <Text style={styles.addBtnText}>Add</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.qtyContainer}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => handleDec(item.id)}
              >
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.qtyNumber}>{qty}</Text>

              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => handleAdd(item.id)}
              >
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View>
      <Title>{title}</Title>
      <FlatList
        data={data}
        numColumns={4}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.container}
      />
    </View>
  );
}

const CARD_WIDTH = vw(80);

const styles = StyleSheet.create({
  container: {
    padding: vw(6),
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: vh(14),
  },
  card: {
    width: CARD_WIDTH,
    padding: vw(0),
    borderRadius: vw(12),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    height: vh(150),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  image: {
    width: '100%',
    height: vh(80),
    borderRadius: vw(8),
    backgroundColor: '#f2f2f2',
    marginBottom: vh(6),
  },

  name: {
    fontSize: vw(12),
    color: '#333',
    textAlign: 'center',
    marginBottom: vh(6),
  },

  bottomSection: {
    padding: vw(6),
    marginTop: 'auto',
    width: '100%',
    alignItems: 'center',
  },

  addBtn: {
    backgroundColor: '#007bff',
    paddingVertical: vh(4),
    width: '100%',
    borderRadius: vw(6),
    alignItems: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontSize: vw(12),
    fontWeight: '600',
  },

  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: vw(6),
    backgroundColor: '#eee',
    paddingVertical: vh(3),
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: vw(8),
  },
  qtyBtn: {
    width: vw(20),
    height: vw(20),
    borderRadius: vw(4),
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: vw(14),
    fontWeight: '700',
  },
  qtyNumber: {
    fontSize: vw(13),
    fontWeight: '600',
  },
});
