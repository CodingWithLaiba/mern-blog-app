import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex justify-between">
      <h3 className="flex-1 font-bold text-4xl">Blog App</h3>
      <ul className="flex gap-3 ">
       <Link to={'/'}> <li className="text-xl font-bold cursor-pointer">Home</li></Link>
       <Link to={'/add-blog'}> <li className="text-xl font-bold cursor-pointer">Add Blog</li></Link>
      </ul>
    </div>
  );
}
