import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/core";
import { RFPercentage } from "react-native-responsive-fontsize";
import UtilsPhoneView from "../../components/UtilsPhoneView";
import { Linking } from "react-native";

export default () => {
  const navigation = useNavigation();

  function handleCall(number) {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  }

  return (
    <LinearGradient
      colors={["#FFC1E3", "#CB2E81"]}
      style={{ width: wp(100), height: hp(100), flex: 1 }}
    >
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ padding: 24, flexDirection: "row", alignItems: "center" }}
        >
          <Icon name={"arrowleft"} size={36} />
          <Text style={{ fontSize: RFPercentage(3), marginLeft: 15 }}>
            {" "}
            Medida Protetiva
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View>
          <Text
            style={{ padding: 30, fontSize: RFPercentage(2.2), paddingTop: 5 }}
          >
            Previstas na Lei Maria da Penha, as medidas protetivas têm o
            propósito de assegurar que toda mulher, independentemente de classe,
            raça, etnia, orientação sexual, renda, cultura, idade, religião ou
            nível educacional, tenha direito a uma vida sem violência, com a
            preservação da saúde física, mental e patrimonial. São mecanismos
            criados pela lei para coibir e prevenir a violência doméstica e
            familiar. Legitimidade das medidas protetivas de urgência O pedido
            de medida protetiva pode ser requerido pelo Ministério Público ou
            pela própria vítima, por meio de advogado ou da Defensoria Pública
            (LMP, art. 19). Na Lei nº 13.827/2019, que acrescentou os artigos
            12-C e 38-A, foi determinado que, respeitando certos pressupostos, a
            autoridade policial - Escrivão, Delegado, Agente de Polícia e
            Polícia Militar também estão legitimados a conceder as medidas
            protetivas de urgência, quando houver risco atual ou iminente à vida
            ou à integridade física da mulher em situação de violência doméstica
            e familiar, ou de seus dependentes. No momento em que tiver
            conhecimento dos fatos, a autoridade policial deve tomar
            providências legais (LMP, art. 10), previstas no art. 11 da Lei
            Maria da Penha.
            {"\n"}
            {"\n"}
            <Text
              style={{ fontWeight: "bold", textDecorationLine: "underline" }}
            >
              ►Exemplo:
            </Text>{" "}
            {"\n"}
            {"\n"}
            Havendo risco à vida ou à integridade física da vítima ou de seus
            dependentes, o agressor será imediatamente afastado do lar. Nessas
            hipóteses, no prazo de 24 horas, deve haver comunicação ao juiz da
            medida aplicada, a quem cabe, em igual prazo, manter ou revogar a
            providência policial, dando-se ciência ao Ministério Público (LMP,
            art. 12-C) Aspectos processuais Lei Maria da Penha garante um
            procedimento diferenciado, denominado de medidas protetivas de
            urgência: providências de conteúdo satisfativo, concedida em
            procedimento simplificado. Trata-se de procedimento cautelar, embora
            sem conteúdo cautelar. Como a ação para obtenção da medida protetiva
            é satisfativa, dispensa o ajuizamento da ação principal em 30
            (trinta) dias. Importante lembrar que a Lei Maria da Penha é uma
            legislação híbrida, com a aplicação na seara penal e cível. Assim,
            nas cidades que não existir Juizado Especializado de Violência
            Doméstica a medida protetiva poderá ser solicitada nas ações de
            família (como divórcio, separação, regulamentação de guarda, visitas
            e pensão alimentícia), e através das ações criminais.
            {"\n"}
            {"\n"}
            <Text
              style={{ fontWeight: "bold", textDecorationLine: "underline" }}
            >
              1. Dúvidas Frequentes{" "}
            </Text>
            {"\n"}
            {"\n"}E se mesmo depois das medidas protetivas deferidas a violência
            continuar? A mulher deverá comparecer à Delegacia para informar os
            novos fatos, onde serão tomadas providências. Se os fatos ainda
            estiverem acontecendo, poderá chamar a Polícia pelo telefone 190. Se
            a mulher solicitou medida protetiva de urgência que proíbam o/a
            agressor/a de se aproximar e manter contato com ela, também não
            deverá manter contato e/ou se aproximar dele/a, pois pode perder
            esta proteção, de acordo com avaliação do juiz. A mulher deve avisar
            se o/a agressor/a descumprir as medidas protetivas de urgência, pois
            {"\n"}
            {"\n"}
            <Text
              style={{ fontWeight: "bold", textDecorationLine: "underline" }}
            >
              O DESCUMPRIMENTO DA MEDIDA PROTETIVA URGÊNCIA POR PARTE DO/A
              AGRESSOR(A) É CRIME. Art. 24-A. Descumprir decisão judicial que
              defere medidas protetivas de urgência previstas nesta Lei: Pena –
              detenção, de 3 (três) meses a 2 (dois) anos.
            </Text>
            {"\n"}
            {"\n"}
            <Text
              style={{ fontWeight: "bold", textDecorationLine: "underline" }}
            >
              ►ATENÇÃO:
            </Text>
            {"\n"}
            {"\n"} A Lei determina que nos casos de prisão em flagrante por
            descumprimento de medida protetiva de urgência, somente o juiz
            poderá arbitrar fiança. Ou seja, o/a agressor/a não poderá ser
            liberado mediante fiança na Delegacia. {"\n"}
            {"\n"}
            <Text
              style={{ fontWeight: "bold", textDecorationLine: "underline" }}
            >
              2. A Lei Maria da Penha é só para mulheres?{" "}
            </Text>{" "}
            {"\n"}
            {"\n"}A Lei Maria da Penha foi criada para proporcionar instrumentos
            adequados para enfrentar um problema que aflige grande parte das
            mulheres no Brasil e no mundo, que é a violência de gênero. Para
            aplicação das medidas protetivas de urgência, a vítima precisa ser
            mulher ou ter identidade social com sexo feminino (alguns Tribunais
            de Justiça já aplicam a legislação para mulheres transexuais). Não
            sendo possível a aplicação das medidas protetivas para homens.
            {"\n"}
            {"\n"}
            <Text
              style={{ fontWeight: "bold", textDecorationLine: "underline" }}
            >
              ►ATENÇÃO:
              {"\n"}
              {"\n"} A violência contra a mulher independe de sua orientação
              sexual.{" "}
            </Text>
            {"\n"}
            {"\n"}
            <Text
              style={{ fontWeight: "bold", textDecorationLine: "underline" }}
            >
              3. Preciso de advogado/a para solicitação das medidas protetivas
              de urgência?
            </Text>
            {"\n"}
            {"\n"} Não. Para pedir a medida protetiva de urgência a mulher não
            precisa estar acompanhada de advogado/a. {"\n"}
            {"\n"}
            <Text
              style={{ fontWeight: "bold", textDecorationLine: "underline" }}
            >
              4. Tenho filhos com agressor/a, ele/a pode realizar visitas aos
              filhos normalmente após a concessão das medidas protetivas de
              urgência?
            </Text>
            {"\n"}
            {"\n"} Entende-se que a convivência entre pais e filhos atende ao
            superior interesse do menor, eis que o desenvolvimento de crianças e
            adolescentes depende, em grade medida, do contato familiar. Sendo
            assim, a vigência de medida protetiva em favor da mãe não
            inviabiliza o direito do pai de conviver com os filhos comuns, mas o
            regime de visitas dever ser fixado de forma clara e objetiva, a fim
            de assegurar o desenvolvimento saudável da criança/adolescente e
            garantir a saúde física e psíquica da mulher.{"\n"}
            {"\n"}
            <Text
              style={{ fontWeight: "bold", textDecorationLine: "underline" }}
            >
              {" "}
              ►DICA:
            </Text>{" "}
            {"\n"}
            {"\n"}
            Aconselha-se o auxílio de uma terceira pessoa (avós, irmão,
            amigos/as, etc) para realizar a intermediação entre as visitas do
            pai com filho. Em último caso, a readequação das medidas protetiva
            para que agressor só se aproxime em dias estipulados. No mais, em
            casos de iminente risco ou perigo de dano para o menor (visitação
            paterna não passa de um artificio do agressor para mais uma vez
            investir contra vítima e até mesmo contra o filho). Nesse caso,
            poderá a mulher vítima de violência doméstica solicitar a restrição
            de convivência paterna, prevista no art. 22, inciso IV, da Lei Maria
            Penha. {"\n"}
            {"\n"}
            <Text
              style={{ fontWeight: "bold", textDecorationLine: "underline" }}
            >
              ►ATENÇÃO: em caso de dúvidas sobre a regulamentação da guarda,
              convivência e alimentos para a criança/adolescente, assim como
              possíveis solicitações de divórcio/reconhecimento de união estável
              e partilha de bens, procure auxílio jurídico!
            </Text>
            {"\n"}
            {"\n"}
            <Text
              style={{ fontWeight: "bold", textDecorationLine: "underline" }}
            >
              5. Qual prazo das medidas protetivas de urgência?
            </Text>
            {"\n"}
            {"\n"}Apesar de a Lei Maria da Penha não ter estipulado, de forma
            expressa, um prazo de duração para as medidas protetivas de
            urgência, estas apresentam caráter excepcional e devem vigorar
            enquanto houver situação de risco para a mulher. Portanto, cabe ao
            Magistrado, observando critérios de proporcionalidade e de
            razoabilidade, analisar as peculiaridades de cada caso e definir um
            período suficiente para garantir a proteção da mulher em situação de
            vulnerabilidade. {"\n"}
            {"\n"}
            <Text
              style={{ fontWeight: "bold", textDecorationLine: "underline" }}
            >
              ►ATENÇÃO: {"\n"}
              {"\n"}o prazo das medidas protetivas não depende de ação penal,
              devendo ser mantidas caso persista risco à integridade física ou
              psíquica da vítima. Fique atenta ao prazo estipulado na sua medida
              protetiva e comunique ao Juízo responsável se, mesmo após vencer o
              prazo dessas, ainda perdurar a violência.{" "}
            </Text>
            {"\n"}
            {"\n"}
            <Text
              style={{ fontWeight: "bold", textDecorationLine: "underline" }}
            >
              6. O que devo fazer se o agressor está retendo e/ou destruindo
              e/ou subtraindo instrumentos de trabalho, documentos pessoais,
              bens, valores e direitos ou recursos econômicos da vítima?{" "}
            </Text>
            {"\n"}
            {"\n"}A situação se configura como violência patrimonial, elencada
            na Lei Maria da Penha, inciso IV, artigo 7º. A violência patrimonial
            é crime e o agressor pode ser denunciado, podendo as vítimas
            registrarem boletim ocorrência sobre o abuso, preferencialmente em
            Delegacias da Mulher. Se não for possível ou não tiver Delegacia da
            Mulher na cidade, a mulher deve ir a uma Delegacia Comum, mais
            próxima de sua residência. Além das consequências penais, a lei
            também prevê medidas protetivas ao patrimônio da mulher, que são
            elas: Art. 24. Para a proteção patrimonial dos bens da sociedade
            conjugal ou daqueles de propriedade particular da mulher, o juiz
            poderá determinar, liminarmente, as seguintes medidas, entre outras:
            I - Restituição de bens indevidamente subtraídos pelo agressor à
            ofendida; II - Proibição temporária para a celebração de atos e
            contratos de compra, venda e locação de propriedade em comum, salvo
            expressa autorização judicial; III - suspensão das procurações
            conferidas pela ofendida ao agressor; IV - Prestação de caução
            provisória, mediante depósito judicial, por perdas e danos materiais
            decorrentes da prática de violência doméstica e familiar contra a
            ofendida. Parágrafo único. Deverá o juiz oficiar ao cartório
            competente para os fins previstos nos incisos II e III deste artigo.
            {"\n"}
            {"\n"}
            <Text
              style={{ fontWeight: "bold", textDecorationLine: "underline" }}
            >
              7. Posso solicitar medidas protetivas de urgência contra pai, mãe,
              irmã, tio etc.?
            </Text>
            {"\n"}
            {"\n"}A violência doméstica e familiar contra a mulher é toda e
            qualquer “ação ou omissão baseada no gênero que lhe cause morte,
            lesão, sofrimento e etc.”, que possua com o ofensor uma relação de
            afeto, de parentesco ou que se realize no âmbito familiar. A mulher
            desta relação de afeto é a namorada, a esposa, a companheira; na
            relação de parentesco é a filha, a irmã, a sobrinha etc; no âmbito
            familiar todas as pessoas acima relacionadas e todas aquelas que,
            embora não tenham qualquer vínculo consanguíneo, mantenham com o
            ofensor relação de agregação, com certo grau de sentimento.
            ►Exemplo: Empregada doméstica, que reside ou não no domicílio do
            empregador e é vitimada por ele. Sendo assim, em casos de violência
            física, sexual, psicológica, moral ou patrimonial poderá a vítima
            solicitar medidas protetivas de urgência.{"\n"}
            {"\n"}
            <Text
              style={{ fontWeight: "bold", textDecorationLine: "underline" }}
            >
              EM CASO DE VIOLÊNCIA DOMÉSTICA E FAMILIAR PROCURE AJUDA E
              DENUNCIE.{" "}
            </Text>
            {"\n"}
            {"\n"}Para mais informações, acesse:{"\n"}
            {"\n"}
            <Text
              style={{ color: "blue" }}
              onPress={() => {
                Linking.openURL(
                  "https://www.institutomariadapenha.org.br/violencia-domestica/o-que-e-violencia-domestica.html"
                );
              }}
            >
              https://www.institutomariadapenha.org.br/violencia-domestica/o-que-e-violencia-domestica.html
            </Text>
          </Text>
        </View>

        <View style={{ alignItems: "center", marginBottom: 35 }}>
          <Text
            style={{
              textDecorationLine: "underline",
              fontSize: RFPercentage(3),
            }}
          >
            Ou ligue !
          </Text>
        </View>

        <UtilsPhoneView
          name="DELEGACIA DA MULHER"
          number="4333221633"
          onPress={() => {
            handleCall("4333221633");
          }}
        />
      </ScrollView>
    </LinearGradient>
  );
};
