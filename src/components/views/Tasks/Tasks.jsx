import "./Tasks.styles.css";
import {useResize} from '../../../hooks/useResize.js';
import { Header } from "../../Header/Header";
import { TaskForm } from "../../TaskForm/TaskForm";
import { Card } from "../../Card/Card";
import { cardsData } from "./data";

export const Tasks = () => {
    
    const {isPhone} = useResize();

    const limitString = (str) => {
        if (str.length > 200)
            return { string: str.slice(0, 197).concat("..."), addButton: true }
        return { string: str, addButton: false }
    }

const renderAllCards = () => {
    return cardsData.map( data => <Card key={data.id} data={data} /> )
}
    return (
        <>
            <Header />
            <main id="tasks">
            <TaskForm/>
                <section className="wrapper_list">
                    <div className="list_header">
                        <h2>My tasks</h2>
                    </div>
                    {isPhone ? (<div className="list phone">
                       {renderAllCards()}
                    </div>) : (<div className="list_group">
                        <div className="list">
                            <h4>New</h4>
                            <div className="card">
                                <div className="close">Delete</div>
                                <h3>Task 1</h3>
                                <h6>18/0/2022 23:06hs</h6>
                                <h5>Javier Cavalero</h5>
                                <button type="button">New</button>
                                <button type="button">High</button>
                                <p>{limitString(`Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem ex, voluptas quibusdam culpa molestias, architecto ratione minima labore, officia reiciendis odio. Nam placeat optio repellat totam deserunt doloribus asperiores odio!
                                Vitae laudantium minus iure dicta libero, magni dolore dolores repudiandae assumenda,
                                 eos eum consequuntur at placeat ipsam numquam. Assumenda unde officiis sunt provident
                                  corrupti explicabo qui error aperiam deleniti mollitia.`).string} </p>
                            </div>
                        </div>
                        <div className="list">
                            <h4>In process</h4>
                            <div className="card">
                                <div className="close">Delete</div>
                                <h3>Task 1</h3>
                                <h6>18/0/2022 23:06hs</h6>
                                <h5>Javier Cavalero</h5>
                                <button type="button">New</button>
                                <button type="button">High</button>
                                <p>lorem</p>
                            </div>
                        </div>
                        <div className="list">
                            <h4>Finished</h4>
                            <div className="card">
                                <div className="close">Delete</div>
                                <h3>Task 1</h3>
                                <h6>18/0/2022 23:06hs</h6>
                                <h5>Javier Cavalero</h5>
                                <button type="button">New</button>
                                <button type="button">High</button>
                                <p>lorem</p>
                            </div>
                        </div>
                    </div>
                    )}

                </section>
            </main>
        </>
    )
}
