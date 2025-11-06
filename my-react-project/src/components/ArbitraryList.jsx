import { Component } from "react";

class ArbitraryList extends Component {
    render() {
        const ListOfItems = ["Apples", "Bread", "Cheese", "Milk", "Tomatoes", "Chocolate"];

        return(<ul>
            {ListOfItems.map((food) => (<li>
                {food}
            </li>))}
        </ul>)
 
    }
}

export default ArbitraryList