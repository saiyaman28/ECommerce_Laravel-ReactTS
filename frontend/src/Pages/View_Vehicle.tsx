// import React from 'react'
import '../Assets/CSS/Pages/View_Vehicle.sass'
import { Main, Section, Group } from '../Exporter/Components_Exporter'
import { AddPageTitle, AddClassBody, UseScreenWidth } from '../Exporter/Hooks_Exporter'
import { Car1, XPanderLogo } from '../Exporter/Public_Exporter'

export default function ViewVehiclePage() {
    AddPageTitle(``)
    AddClassBody(`ViewVehicle-Page`)
    const screenwidth = UseScreenWidth()

    return (
        <>
            <Main>
                <Section Title={`Leveled-Up Driving Experience`} ID={`vehicle`}>
                    <h4>
                        From quick errands to long road trips, the New Xpander’s smart features bring comfort { screenwidth > 767 && <br/> }  
                        and ease to every moment you share with your family.
                    </h4>
                    { screenwidth > 1266 ?
                    <Group Row>
                        <div>
                            <img id={`vehicle`} src={Car1} />
                        </div>
                        <Group>
                            <img id={`logo`}  src={XPanderLogo} />
                            <h1>Level Up Your Drive</h1>
                        </Group>
                    </Group>
                    :
                    <Group>
                        <Group>
                            <img id={`logo`}  src={XPanderLogo} />
                            <h1>Level Up Your Drive</h1>
                        </Group>
                        <div>
                            <img id={`vehicle`} src={Car1} />
                        </div>
                    </Group>
                    }
                </Section>
            </Main>
        </>
    )
}