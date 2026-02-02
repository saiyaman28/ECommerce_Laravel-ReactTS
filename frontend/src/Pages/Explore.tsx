// import React from 'react'
import '../Assets/CSS/Pages/Explore.sass'
import { Main, Section, Group, Card, Href } from '../Exporter/Components_Exporter'
import { AddPageTitle, AddClassBody } from '../Exporter/Hooks_Exporter'
import { Car1, Car2, Car3, BGCard1, BGCard2, BGCard3 } from '../Exporter/Public_Exporter'

export default function ExplorePage() {
    AddPageTitle(`Explore More`)
    AddClassBody(`Explore-Page`)

    return (
        <>
            <Main>
                <Section Title={`EXPLORE MORE`} ID={`explore`}>
                    <Group>
                        <Href Object={<Card Image={Car1} BGImage={BGCard1} Title={`MITSUBISHI XPANDER`} />} Redirect={`/vehicle`} />
                        <Card Image={Car2} BGImage={BGCard2} Title={`TOYOTA RUSH`} />
                        <Card Image={Car3} BGImage={BGCard3} Title={`HONDA CITY`} />
                        {/* <Card Title={`XPANDER`}/> */}
                    </Group>
                </Section>
            </Main>
        </>
    )
}