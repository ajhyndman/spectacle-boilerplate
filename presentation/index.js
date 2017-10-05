// Import React
import React from 'react';
// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Heading,
  Image,
  Link,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
} from 'spectacle';
// Import image preloader util
import preloader from 'spectacle/lib/utils/preloader';
// Import theme
import createTheme from 'spectacle/lib/themes/default';

import './index.css';

// Require CSS
require('normalize.css');
require('spectacle/lib/themes/default/index.css');

const images = {
  kafkaAfter: require('../assets/kafka-after.png'),
  kafkaBefore: require('../assets/kafka-before.png'),
  kafkaComposition: require('../assets/kafka-composition.png'),
  logo: require('../assets/formidable-logo.svg'),
};

preloader(images);

const theme = createTheme(
  {
    primary: 'white',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quaternary: '#CECECE',
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica',
  },
);

const Footnote = ({ children, ...props }) => (
  <Text {...props} margin="3em 0 0" textAlign="left" textSize="0.5em">
    {children}
  </Text>
);

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transition={['slide']} transitionDuration={300} theme={theme}>
        {/* Title */}
        <Slide bgColor="secondary">
          <Heading size={1} fit caps lineHeight={1} textColor="primary">
            Functional Databases
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" fit bold>
            Or: Log-Based Data Management
          </Text>
        </Slide>

        {/* Introduction */}
        <Slide bgColor="secondary" textColor="tertiary">
          <Heading size={6} textColor="primary" caps>
            Buzzwords you may have heard
          </Heading>
          <List>
            <ListItem>Stream Processing</ListItem>
            <ListItem>Event Sourcing</ListItem>
            <ListItem>
              Change Data Capture <strong>(CDC)</strong>
            </ListItem>
            <ListItem>CQRS</ListItem>
            <ListItem>Lambda Architecture</ListItem>
          </List>
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={6} textColor="primary" lineHeight={2} caps>
            Outline
          </Heading>
          <Heading size={4} lineHeight={1.5} textColor="tertiary">
            Databases
          </Heading>
          <Heading size={4} lineHeight={1.5} textColor="tertiary">
            Other Software
          </Heading>
          <Heading size={4} lineHeight={1.5} textColor="tertiary">
            Functional Databases?
          </Heading>
          <Heading size={4} lineHeight={1.5} textColor="tertiary">
            Looking Forward
          </Heading>
        </Slide>

        {/* I: Databases */}
        <Slide bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="tertiary">
            Databases
          </Heading>
          <Text margin="10px 0 0" textColor="secondary" fit bold>
            The State of the Art
          </Text>
        </Slide>
        <Slide bgColor="primary" textColor="secondary">
          <Heading size={6} textColor="tertiary" lineHeight={2} caps>
            Relational Database Engines
          </Heading>
          <List>
            <ListItem>Enterprise Software</ListItem>
            <ListItem>Proprietary</ListItem>
            <ListItem>"One-size-fits-all"</ListItem>
            <ListItem>Feature rich</ListItem>
          </List>
        </Slide>
        <Slide bgColor="primary" textColor="secondary">
          <Heading size={6} textColor="tertiary" lineHeight={2} caps>
            Read vs Write Optimisation
          </Heading>
          <Text fit>This decision drives many difficult tradeoffs.</Text>
          <List>
            <ListItem>Normalised / Denormalised</ListItem>
            <ListItem>Database Engine</ListItem>
            <ListItem>SQL / NoSQL</ListItem>
            <ListItem>Scaling strategy</ListItem>
          </List>
        </Slide>
        <Slide bgColor="primary" textColor="secondary">
          <Heading size={6} textColor="tertiary" lineHeight={2} caps>
            Cache Strategies
          </Heading>
          <List>
            <ListItem>Dual Writes</ListItem>
            <ListItem>Write on Read</ListItem>
            <ListItem>Batch Processing</ListItem>
          </List>
        </Slide>
        <Slide bgColor="primary" textColor="secondary">
          <Heading size={6} textColor="tertiary" lineHeight={2} caps>
            Analytics
          </Heading>
          <Text textAlign="left" textSize="1em">
            This is often accomplished with batch processing services like
            Hadoop and MapReduce
          </Text>
          <List>
            <ListItem>Isolates primary data from perf hit</ListItem>
            <ListItem>Arbitrarily scalable</ListItem>
            <ListItem>Deterministic</ListItem>
            <ListItem>Replayable</ListItem>
            <ListItem>Composable</ListItem>
            <ListItem>Large investment</ListItem>
            <ListItem>Doomed to be stale</ListItem>
          </List>
        </Slide>
        <Slide bgColor="primary" textColor="secondary">
          <BlockQuote>
            <Quote textColor="secondary">
              We don't really use MapReduce anymore
            </Quote>
            <Cite>Urs Hölzle (Senior VP at Google)</Cite>
          </BlockQuote>
          <Link href="http://the-paper-trail.org/blog/the-elephant-was-a-trojan-horse-on-the-death-of-map-reduce-at-google/">
            <Footnote>
              The Elephant was a Trojan Horse: On the Death of Map-Reduce at
              Google
            </Footnote>
          </Link>
        </Slide>
        <Slide bgColor="primary" textColor="secondary">
          <Heading size={6} textColor="tertiary" lineHeight={2} fit caps>
            What's the common thread?
          </Heading>
          <Text textAlign="left">These are all examples of Derived Data.</Text>
          <Text textAlign="left">
            <strong>Primary Data:</strong> New data is first written here. Each
            fact should only be present once (normalised). In case of
            discrepency, this source is considered correct.
          </Text>
          <Text textAlign="left">
            <strong>Derived Data:</strong> Data retrieved from another source,
            and transformed or processed.{' '}
            <em>(Includes: caches, denormalized values, indexes, etc.)</em>
          </Text>
        </Slide>

        {/* II: Other Software */}
        <Slide bgColor="tertiary" textColor="primary">
          <Heading size={6} textColor="primary" lineHeight={2} fit caps>
            Why is derived data hard?
          </Heading>
        </Slide>
        <Slide bgColor="tertiary" textColor="primary">
          <Text textColor="primary" textAlign="left">
            Databases are effectively a single, global, mutable state.
          </Text>
          <Text textColor="primary" textAlign="left">
            A database can be changed irreversibly at any time, and
            transactional guarantees are only provided within a request/response
            model.
          </Text>
          <Text textColor="primary" textAlign="left">
            This means synchronisation becomes the responsibility of anything
            but the database engine.
          </Text>
        </Slide>
        <Slide bgColor="tertiary" textColor="primary">
          <Heading size={6} textColor="secondary" lineHeight={2} fit caps>
            What else can we do?
          </Heading>
          <Text textColor="primary" textAlign="left">
            We do have examples of "streams" in other programming environments.
          </Text>
          <List>
            <ListItem>UNIX</ListItem>
            <ListItem>Node</ListItem>
            <ListItem>Redux</ListItem>
            <ListItem>Lambda Architecture</ListItem>
          </List>
        </Slide>
        <Slide bgColor="tertiary" textColor="primary">
          <Heading size={6} textColor="secondary" lineHeight={2} caps>
            UNIX
          </Heading>
          <CodePane lang="bash" textSize="1em">
            {`cat access.log
  | awk '{print $7}'
  | sort
  | uniq -c
  | sort -r -n
  | head -n 5`}
          </CodePane>
          <List>
            <ListItem>Uniform interface: "Files"</ListItem>
            <ListItem>Separation of "logic" from "wiring"</ListItem>
          </List>
        </Slide>
        <Slide bgColor="tertiary" textColor="primary">
          <Heading size={6} textColor="secondary" lineHeight={2} fit caps>
            How do streams work?
          </Heading>
          <List>
            <ListItem>Data is structured as sequence of records</ListItem>
            <ListItem>Data can be incrementally processed</ListItem>
            <ListItem>Source is treated as read-only</ListItem>
            <ListItem>Pipeline transparency</ListItem>
          </List>
        </Slide>
        <Slide bgColor="tertiary" textColor="primary">
          <Heading size={6} textColor="secondary" lineHeight={2} caps>
            System Classes
          </Heading>
          <Text textColor="primary">
            <strong>Offline:</strong> batch processing
          </Text>
          <Text textColor="primary">
            <strong>Online:</strong> request / response service
          </Text>
          <Text textColor="primary">
            <strong>Real-Time:</strong> stream processing
          </Text>
        </Slide>

        {/* III: Functional Databases? */}
        <Slide bgColor="secondary">
          <Heading size={1} fit caps lineHeight={1} textColor="tertiary">
            Functional Databases?
          </Heading>
        </Slide>
        <Slide bgColor="secondary" textColor="primary">
          <Heading size={6} textColor="tertiary" lineHeight={2} caps>
            What are you on about already?!
          </Heading>
          <Text textColor="primary" textAlign="left">
            The big idea:
          </Text>
          <Text textColor="primary" textAlign="left">
            Swap out our <em>mutable</em> <strong>Primary Data</strong> stores
            with an <em>immutable log</em>, and use the "stream" paradigm to
            achieve any of our synchronized <strong>Derived Data</strong> needs.
          </Text>
        </Slide>
        <Slide bgColor="secondary" textColor="primary">
          <Heading size={6} textColor="tertiary" lineHeight={2} caps>
            What is a log?
          </Heading>
          <List>
            <ListItem>Totally ordered</ListItem>
            <ListItem>Immutable</ListItem>
            <ListItem>Unbounded</ListItem>
            <ListItem>Incrementally processable</ListItem>
            <ListItem>Durable</ListItem>
            <ListItem>Repeatable reads</ListItem>
          </List>
        </Slide>
        <Slide bgColor="secondary" textColor="primary">
          <Heading size={6} textColor="tertiary" lineHeight={2} caps>
            Other terminology
          </Heading>
          <List>
            <ListItem>Event</ListItem>
            <ListItem>Producer</ListItem>
            <ListItem>Consumer</ListItem>
            <ListItem>Topic</ListItem>
            <ListItem>Partition</ListItem>
          </List>
        </Slide>
        <Slide bgColor="secondary" textColor="primary">
          <Heading size={6} textColor="tertiary" lineHeight={2} caps>
            Can it be done?
          </Heading>
          <Text textColor="primary" textAlign="left">
            It's not a completely new idea:
          </Text>
          <List>
            <ListItem>Version Control Software</ListItem>
            <ListItem>Flux & Redux</ListItem>
          </List>
        </Slide>
        <Slide bgColor="secondary" textColor="primary">
          <Heading size={6} textColor="tertiary" lineHeight={2} caps>
            Change Data Capture
          </Heading>
          <Text textColor="primary" textAlign="left">
            The process of recording <em>low-level</em> value changes over time.
            This is what many database engines do internally, and is how
            replication is supported.
          </Text>
          <Heading size={6} textColor="tertiary" lineHeight={2} caps>
            Event Sourcing
          </Heading>
          <Text textColor="primary" textAlign="left">
            An idea that originated in the DDD community, events are{' '}
            <em>designed</em> to reflect things that happened in the application
            domain.
          </Text>
        </Slide>
        <Slide bgColor="secondary" textColor="primary">
          <Heading size={6} textColor="tertiary" lineHeight={2} caps>
            What can it do?
          </Heading>
          <List>
            <ListItem>Retrospective schema design</ListItem>
            <ListItem>"Gradual Migration"</ListItem>
            <ListItem>"Minimized Irreversibility"</ListItem>
            <ListItem>Data Integration</ListItem>
          </List>
        </Slide>
        <Slide bgColor="secondary" textColor="primary">
          <Heading size={6} textColor="tertiary" lineHeight={2} caps>
            What can it do?
          </Heading>
          <Image bgColor="white" padding="20px" src={images.kafkaBefore} />
        </Slide>
        <Slide bgColor="secondary" textColor="primary">
          <Heading size={6} textColor="tertiary" lineHeight={2} caps>
            What can it do?
          </Heading>
          <Image bgColor="white" padding="20px" src={images.kafkaAfter} />
        </Slide>
        <Slide bgColor="secondary" textColor="primary">
          <Heading size={6} textColor="tertiary" lineHeight={2} caps>
            Composability
          </Heading>
          <Image
            bgColor="white"
            padding="20px"
            src={images.kafkaComposition}
            width="100%"
          />
        </Slide>

        <Slide bgColor="secondary" textColor="primary">
          <Heading size={6} textColor="tertiary" lineHeight={2} caps>
            Scaling
          </Heading>
          <Text textColor="primary" textAlign="left">
            Sounds great, but how can you possibly scale an{' '}
            <em>unbounded, totally ordered, immutable</em> list!
          </Text>
        </Slide>
        <Slide bgColor="secondary" textColor="primary">
          <Heading size={6} textColor="tertiary" lineHeight={2} caps>
            Real-World Examples
          </Heading>
          <Text textColor="primary" textAlign="left">
            Surprise, it's already been done!
          </Text>
          <List>
            <ListItem>
              LinkedIn's <strong>Databus</strong>
            </ListItem>
            <ListItem>
              Yahoo's <strong>Sherpa</strong>
            </ListItem>
            <ListItem>
              Twitter's <strong>DistributedLog</strong>
            </ListItem>
            <ListItem>
              Facebook's <strong>Wormhole</strong>
            </ListItem>
          </List>
          <Text textColor="primary" textAlign="left">
            And consumer grade solutions:
          </Text>
          <List>
            <ListItem>
              <strong>Apache Kafka</strong>
            </ListItem>
            <ListItem>
              <strong>AWS Kinesis</strong>
            </ListItem>
          </List>
        </Slide>
        <Slide bgColor="secondary" textColor="primary">
          <Heading size={6} textColor="tertiary" lineHeight={2} caps>
            How does it work?
          </Heading>
          <Text textColor="primary" textAlign="left">
            Logs have a very restrictive API. These extra assumptions let
            implementations make optimisations.
          </Text>
          <List>
            <ListItem>Sequential reads & writes</ListItem>
            <ListItem>Compaction</ListItem>
            <ListItem>Immutable data structures</ListItem>
            <ListItem>Moving initial state snapshots (CDC only)</ListItem>
            <ListItem>Partitions (CDC only)</ListItem>
            <ListItem>
              Write and read optimisation can be optimised in separate systems
            </ListItem>
          </List>
        </Slide>
        <Slide bgColor="secondary" textColor="primary">
          <Heading size={6} textColor="tertiary" lineHeight={2} caps>
            Replication
          </Heading>
          <Text textColor="primary">
            It can be shown that consensus and total order broadcast are
            equivalent problems.
          </Text>
          <Text textColor="primary">
            This means that given any consensus algorithm, we can add replicas
            to a log system which can share both write <em>and</em> read load!
          </Text>
        </Slide>
        <Slide bgColor="secondary" textColor="primary">
          <Heading size={6} textColor="tertiary" lineHeight={2} caps>
            Unsolved Problems
          </Heading>
          <List>
            <ListItem>"Reading your own writes"</ListItem>
            <ListItem>Data Privacy</ListItem>
          </List>
        </Slide>

        {/* IV: Looking Forward */}
        <Slide bgColor="secondary" textColor="primary">
          <Heading size={1} textColor="tertiary" lineHeight={2} caps>
            What's next?
          </Heading>
        </Slide>
        <Slide bgColor="secondary" textColor="primary">
          <Heading size={6} textColor="tertiary" lineHeight={2} caps>
            Looking Forward
          </Heading>
          <List>
            <ListItem>Kafka Connect</ListItem>
            <ListItem>KSQL</ListItem>
            <ListItem>Higher Level composition language?</ListItem>
            <ListItem>"Meta Databases"</ListItem>
          </List>
        </Slide>

        {/* Conclusion */}
        <Slide bgColor="secondary" textColor="primary">
          <Heading size={1} textColor="tertiary" lineHeight={2} caps>
            Questions?
          </Heading>
        </Slide>
      </Deck>
    );
  }
}
