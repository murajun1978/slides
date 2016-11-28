import React from "react";

import {
  Appear,
  Deck,
  Heading,
  Link,
  ListItem,
  List,
  Slide,
  Spectacle,
  Text
} from "spectacle";

import createTheme from "spectacle/lib/themes/default";

require("normalize.css");
require("spectacle/lib/themes/default/index.css");

const theme = createTheme({
  primary: "#464E70"
});

export default class Presentation extends React.Component {
  render() {
    const textColor = "#FFF5E3";

    return (
      <Spectacle theme={theme}>
        <Deck transition={["zoom", "slide"]} transitionDuration={500}>

          <Slide transition={["slide"]}>
            <Heading size={1} fit caps lineHeight={1}>
              <Text bold caps textColor={textColor}>Rails Follow-up Osaka #1</Text>
            </Heading>
            <br />
            <Link href="https://rails-follow-up-osaka.github.io/">
              <Text bold caps textColor={textColor}>View on Github Pages</Text>
            </Link>
          </Slide>

          <Slide transition={["slide"]} bgColor="primary">
            <Heading size={1} fit caps lineHeight={1}>
              <Link href="https://corporate.iticket.co.jp/">
                <Text bold caps textColor={textColor}>株式会社アイチケット 大阪支店</Text>
              </Link>
            </Heading>
          </Slide>

          <Slide transition={["fade"]} bgColor="primary" textColor={textColor}>
            <Heading caps fit>Rails Follow-up</Heading>
            <List>
              <Appear><ListItem>初心者・初級者向けに有志でフォロー</ListItem></Appear>
              <Appear><ListItem>開発環境の構築</ListItem></Appear>
              <Appear><ListItem>言語の習得(Ruby, Javascript, Sass)</ListItem></Appear>
              <Appear><ListItem>WEBアプリケーションの作成に必要な基礎知識</ListItem></Appear>
              <Appear><ListItem>and more...</ListItem></Appear>
            </List>
          </Slide>

          <Slide transition={["slide"]}>
            <Heading size={1} fit caps lineHeight={1}>
              <Text bold caps textColor={textColor}>初心者から上級者まで</Text>
              <Text bold caps textColor={textColor}>みんなで楽しく</Text>
              <Text bold caps textColor={textColor}>腕前を上げていこうヘ(^o^)ノ</Text>
            </Heading>
          </Slide>

          <Slide transition={["slide"]} bgColor="primary">
            <Heading size={1} fit caps lineHeight={1}>
              <Link href="https://rails-followup-kobe.doorkeeper.jp/">
                <Text bold caps textColor={textColor}>Rails Follow-up Kobe</Text>
              </Link>
            </Heading>
          </Slide>

          <Slide transition={["slide"]} bgColor="primary">
            <Heading fit>Enjoy CODE</Heading>
          </Slide>

        </Deck>
      </Spectacle>
    );
  }
}
