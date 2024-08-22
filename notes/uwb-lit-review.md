---
title: UWB Literature Review in 2024
---

SEE ALSO: [UWB Qorvo DW3XXX family notes](../uwb-dw3xxx)

## use case I'm focused on
* cheap UWB nodes we need the location and sensor data from
* expensive mobile gateway UWB nodes with GNSS and LTE that need to report the
  locations of all nodes
* Nodes will report status towards gateway
* nice to have: ability for phones to be the gateway nodes

## Literature Review
### Literature Review Review
* [An Overview of UWB Standards and Organizations (IEEE 802.15.4, FiRa, Apple): Interoperability Aspects and Future Research Directions](https://ieeexplore.ieee.org/document/9810941)
  * Great overview of standards gropus and OSI model stuff
    * Required reading for background I'm not providing here
  * standards changes since then
    * fira 2 came out 2023
    * omlox 2 2023
* [Applications of UWB Networks and Positioning to Autonomous Robots and Industrial Systems](https://arxiv.org/abs/2103.13488)
  * focused on robots, but a lot of the same mesh localization needs
* [The state of uwb in 2024(pozyx blog)](https://www.pozyx.io/newsroom/the-state-of-uwb)
  * some notes on recent standards changes
* [RPL Routing Protocol over IoT: A Comprehensive Survey, Recent Advances, Insights, Bibliometric Analysis, Recommendations, and Future Directions](https://www.researchgate.net/profile/Muna-Alakhras/publication/362752679_RPL_routing_protocol_over_IoT_A_comprehensive_survey_recent_advances_insights_bibliometric_analysis_recommendations_and_future_directions/links/64d93ed3ad846e28828d2ed0/RPL-routing-protocol-over-IoT-A-comprehensive-survey-recent-advances-insights-bibliometric-analysis-recommendations-and-future-directions.pdf)
  * > RPL builds and maintains a Destination-Oriented Directed Acyclic Graph (DODAG) topology that originates from a designated RPL root node
  * This could be useful if all nodes repeating to everyone cause congestion

### Normal Literature Review
* [SRAC: Simultaneous Ranging and Communication in UWB Networks](https://www2.cs.uh.edu/~gnawali/papers/uwbsrac-dcoss2019.pdf)
  * very relevant, mesh & localization
  * integrated into RIOT OS, an RTOS which only has drivers for dw1000
  * RPL
* [Autocalibration of a Mobile UWB Localization System for Ad-Hoc Multi-Robot Deployments in GNSS-Denied Environments](https://arxiv.org/abs/2004.06762)
  * very relevant, moving anchors!
* [SnapLoc: An Ultra-Fast UWB-Based Indoor Localization System for an Unlimited Number of Tags](https://grosswindhager.com/pubs/grosswindhager2019snaploc.pdf)
  * anchor broadcasts and *all* nodes in range respond so it can get multiple
    responses faster
* [Comparing Decawave and Bespoon UWB location systems: indoor/outdoor performance analysis](https://www.researchgate.net/profile/Antonio-Jimenez-11/publication/310499120_Comparing_Decawave_and_Bespoon_UWB_location_systems_Indooroutdoor_performance_analysis/links/5c136aca4585157ac1c0c397/Comparing-Decawave-and-Bespoon-UWB-location-systems-Indoor-outdoor-performance-analysis.pdf)
  * antenna matters
* [Location-Aware Point-to-Point RPL in Indoor IR-UWB Networks](https://www.researchgate.net/publication/341618862_Location-Aware_Point-to-Point_RPL_in_Indoor_IR-UWB_Networks?_tp=eyJjb250ZXh0Ijp7ImZpcnN0UGFnZSI6Il9kaXJlY3QiLCJwYWdlIjoiX2RpcmVjdCJ9fQ)
  * proposed location aware P2P-RPL algorithm, better than spec P2P-RPL or ER-RPL for performance and overhead
* [3D Void Handling Geographic P2P-RPL for Indoor Multi-Hop IR-UWB Networks](https://mdpi-res.com/d_attachment/electronics/electronics-11-00625/article_deploy/electronics-11-00625.pdf)
  * proposed location aware P2P-RPL algorithm, better than spec P2P-RPL or ER-RPL for performance and overhead
* [Towards Large-Scale Relative Localization in Multi-Robot Systems with Dynamic UWB Role Allocation](https://arxiv.org/abs/2203.03893)
  * dynamic role allocation would be useuful to us cause we need constant ranging
* [Anchor self-localization algorithm based on UWB ranging and inertial measurements](https://ieeexplore.ieee.org/document/8727766)
* [Accurate position tracking with a single UWB anchor](https://arxiv.org/abs/2005.10648)
  * single known anchor, mobile rover with imu

### Standards we (might) care about
* [IEEE 802.15.4-2020](https://standards.ieee.org/ieee/802.15.4/7029/) and
  [IEEE 802.15.4z-2020](https://standards.ieee.org/ieee/802.15.4z/10230/)
  * define PHY and MAC for many things, UWB included
  * FIRA also has specs for PHY/MAC, but they're apparently the same?
* [RFC 6550: RPL: IPv6 Routing Protocol for Low-Power and Lossy Networks](https://datatracker.ietf.org/doc/html/rfc6550)
* FiRa specs that might be relevant
  * FiRa® UWB Command Interface (UCI) Technical Specification v2.0.0
    * communication protocol between the UWB Subsystem (UWBS) and the Host
  * FiRa® Common Service & Management Layer (CSML) Technical Specification
    v1.0.0
    * FiRa® UWB host framework and application programming interfaces between
      other host components, a secure component, and FiRa-enabled applications
  * FiRa® Secure UWB Service (SUS) API Technical Specification v1.0.0
    * external reference interfaces between a secure component and a UWBS and
      the internal interface between a service applet and the SUS applet
  * FiRa® Bluetooth® Low Energy Out-of-Band (OOB) Channel Technical
    Specification v.1.0.0
* [IEEE 802.15.4ab](https://standards.ieee.org/ieee/802.15.4ab/10694/) upcoming
  bandwidth spec
  * random news article says it's expected 2025, not sure it's super relevant
* [Apple Nearby Interaction Accessory Protocol Specification](https://developer.apple.com/nearby-interaction/specification/)
  * implement BLE gatt service, phone connects, some data exchange via that, phone initiates ranging

### cool resources and TLAs
* HRP vs LRP: high rate pulse low rate pulse, we only care about high
  * lower frequency better range, but lower frequencies don't have regulatory acceptance
* [uwb spectrum legality across the world](https://www.firaconsortium.org/sites/default/files/2023-07/fira-uwb-availability-chart.svg)
  * this is why FIRA says use specific channels
