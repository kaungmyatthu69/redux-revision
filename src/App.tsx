import PostList from "@/components/PostList";
import CounterPage from "@/pages/CounterPage";

function App() {
  return (
    <div className=" flex justify-center items-center mt-10 flex-col">
      <CounterPage />
      <PostList />
    </div>
  );
}

export default App;
