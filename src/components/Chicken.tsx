interface ChickenProps {
    name?: string;
    age?: number;
    color?: string;
}

const Chicken = ({
    name = "Unknown Chicken",
    age = 1,
    color = "Unknown",
}: ChickenProps) => {

    return (

        <div>

            <h2>
                Chicken Details
            </h2>

            <p>
                Name: {name}
            </p>

            <p>
                Age: {age} years
            </p>

            {color && (
                <p>
                    Color: {color}
                </p>
            )}

        </div>
    );
};

export default Chicken;